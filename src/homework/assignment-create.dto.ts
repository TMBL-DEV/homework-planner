import { IsNotEmpty, IsDate, Min, IsString, IsNumber } from "class-validator";
import { Class } from "src/entities/class.entity";
import { Assignment } from "../entities/assignment.entity";
import { Subject } from "../entities/subject.entity";

export class CreateAssignmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(Date.now())
    dueDate: number;

    @IsNotEmpty()
    subjectId: number;

    @IsNotEmpty()
    classes: number[];

    static toEntity(
        dto: CreateAssignmentDto,
        subject: Subject,
        classes: Class[],
    ): Assignment {
        const ass = new Assignment();

        ass.title = dto.title;
        ass.description = dto.description;
        ass.due_date = new Date(dto.dueDate);
        ass.subject = subject;
        ass.classes = classes;

        return ass;
    }
}
