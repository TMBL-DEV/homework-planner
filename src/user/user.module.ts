import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { UsersService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
