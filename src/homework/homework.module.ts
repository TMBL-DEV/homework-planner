import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assignment } from "../entities/assignment.entity";
import { Subject } from "../entities/subject.entity";
import { HomeworkService } from "./homework.service";
import { HomeworkController } from './homework.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Assignment])],
    providers: [HomeworkService],
    exports: [TypeOrmModule],
    controllers: [HomeworkController],
})
export class HomeworkModule {}
