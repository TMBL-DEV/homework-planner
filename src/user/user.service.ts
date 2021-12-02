import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Class } from "src/class/class.entity";
import { Repository } from "typeorm";
import { Users } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<Users> {
        return this.usersRepository.findOne(id);
    }

    findOneByMail(email: string): Promise<Users> {
        return this.usersRepository.findOne({ email });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(
        email: string,
        hashedPassword: string,
        schoolClass: Class,
        active = true,
    ) {
        const user = this.usersRepository.create({
            email: email,
            password: hashedPassword,
            isActive: active,
            schoolClass: schoolClass,
        });

        return this.usersRepository.save(user);
    }
}
