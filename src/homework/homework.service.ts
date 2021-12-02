import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Class } from "src/class/class.entity";
import { Repository } from "typeorm";
import { CreateAssignmentDto } from "./assignment-create.dto";
import { Assignment } from "./assignment.entity";
import { Subject } from "./subject.entity";

@Injectable()
export class HomeworkService {
    constructor(
        @InjectRepository(Assignment)
        private assignmentsRepo: Repository<Assignment>,
        @InjectRepository(Subject)
        private subjectRepo: Repository<Subject>,
        @InjectRepository(Subject)
        private schoolClassRepo: Repository<Class>,
    ) {}

    all(): Promise<Assignment[]> {
        return this.assignmentsRepo.find({
            relations: ["subject", "classes"],
        });
    }

    async create(
        validatedAssignment: CreateAssignmentDto,
    ): Promise<Assignment> {
        const subject = await this.subjectRepo.findOne(
            validatedAssignment.subjectId,
        );

        const classes: Class[] = [];

        validatedAssignment.classes.forEach(async (id: number) => {
            classes.push(await this.schoolClassRepo.findOne(id));
        });

        const assignment = this.assignmentsRepo.create(
            CreateAssignmentDto.toEntity(validatedAssignment, subject, classes),
        );
        this.assignmentsRepo.save(assignment);

        return assignment;
    }

    async subjects(): Promise<Subject[]> {
        return this.subjectRepo.find();
    }
}
