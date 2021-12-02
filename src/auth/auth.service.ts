import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ClassService } from "src/class/class.service";
import { UsersService } from "src/user/user.service";

@Injectable()
export class AuthService {
    public SALT_ROUNDS = 10;

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private schoolClassService: ClassService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByMail(email);

        if (user && bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    async register(email: string, password: string, schoolClassId) {
        const user = await this.userService.findOneByMail(email);

        if (user) {
            throw new HttpException(
                "user with this email already exists",
                HttpStatus.BAD_REQUEST,
            );
        }

        this.userService.create(
            email,
            await this.hashPassword(password),
            await this.schoolClassService.find(schoolClassId),
        );
    }

    async hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, this.SALT_ROUNDS);
    }

    async login(user: any) {
        return this.jwtService.sign({ email: user.email, sub: user.id });
    }
}
