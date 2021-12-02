import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Assignment } from "./assignment.entity";

@Entity({ name: "subjects" })
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @OneToMany(() => Assignment, (assignment) => assignment.subject)
    assignments: Assignment[];
}
