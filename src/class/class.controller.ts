import { Controller, Get } from "@nestjs/common";
import { ClassService } from "./class.service";

@Controller("class")
export class ClassController {
    constructor(private schoolClassService: ClassService) {}

    @Get("/")
    index() {
        return this.schoolClassService.all();
    }
}
