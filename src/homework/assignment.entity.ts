import { Class } from "src/class/class.entity";
import { Subject } from "./subject.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    Column,
} from "typeorm";

@Entity({ name: "assignments" })
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "timestamp" })
    due_date: Date;

    @ManyToOne(() => Subject, (subject) => subject.assignments)
    subject: Subject;

    @ManyToMany(() => Class, (schoolClass) => schoolClass.assignments)
    classes: Class[];
}
