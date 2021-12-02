import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "src/entities/class.entity";

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepo: Repository<Class>,
    ) {}

    find(id: number) {
        return this.classRepo.findOne(id);
    }

    all() {
        return this.classRepo.find();
    }
}
