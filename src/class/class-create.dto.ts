import { IsNotEmpty, IsInt, IsString } from "class-validator";

export class CreateClassDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}
