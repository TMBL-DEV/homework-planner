import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateAssignmentDto } from "./assignment-create.dto";
import { Assignment } from "./assignment.entity";
import { HomeworkService } from "./homework.service";
import { Subject } from "./subject.entity";

@Controller("homework")
@UseGuards(JwtAuthGuard)
export class HomeworkController {
    constructor(private homeworkService: HomeworkService) {}

    @Post()
    create(@Body() assignment: CreateAssignmentDto) {
        return this.homeworkService.create(assignment);
    }

    @Get("/")
    index(): Promise<Assignment[]> {
        return this.homeworkService.all();
    }

    @Get("/subjects")
    indexSubjects(): Promise<Subject[]> {
        return this.homeworkService.subjects();
    }
}
