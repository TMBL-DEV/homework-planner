import { Assignment } from "./assignment.entity";
import { IsNotEmpty, IsInt, IsString } from "class-validator";

export class CreateClassDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    assignments: Assignment[];
}
