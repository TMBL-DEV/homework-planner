import { Users } from "src/user/user.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm";
import { Assignment } from "../homework/assignment.entity";

@Entity({ name: "school_classes" })
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @OneToMany(() => Users, (user) => user.schoolClass)
    users: Users[];

    @ManyToMany(() => Assignment, (assignment) => assignment.classes)
    @JoinTable({ name: "school_classes_assignments" })
    assignments: Assignment[];
}
