import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Class } from "src/entities/class.entity";
import { ClassController } from "./class.controller";
import { ClassService } from "./class.service";

@Module({
    imports: [TypeOrmModule.forFeature([Class])],
    providers: [ClassService],
    exports: [TypeOrmModule, ClassService],
    controllers: [ClassController],
})
export class ClassModule {}
