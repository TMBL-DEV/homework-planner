import { Class } from "src/entities/class.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Class, (schoolClass) => schoolClass.users)
    schoolClass: Class;

    @Column({ default: true })
    isActive: boolean;
}
