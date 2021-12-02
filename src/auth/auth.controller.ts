import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "src/user/user-create.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post("register")
    async register(@Body() body: CreateUserDto) {
        const { email, password, schoolClassId } = body;

        return this.authService.register(email, password, schoolClassId);
    }

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Request() req): Promise<object> {
        return {
            access_token: await this.authService.login(req.user),
        };
    }
}
