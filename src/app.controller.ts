import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { HomeworkService } from "./homework/homework.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private homeworkService: HomeworkService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(JwtAuthGuard)
    @Get("jwt-test")
    async getTestData() {
        return {
            "sensitive-shit": "oogabooga",
            extra: await this.homeworkService.all(),
        };
    }
}
