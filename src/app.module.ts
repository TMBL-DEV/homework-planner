import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/user.module";
import { AuthController } from "./auth/auth.controller";
import { HomeworkModule } from "./homework/homework.module";
import { ClassModule } from "./class/class.module";
import { HomeworkService } from "./homework/homework.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        AuthModule,
        HomeworkModule,
        ClassModule,
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            synchronize: true,
        }),
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService, HomeworkService],
})
export class AppModule {}
