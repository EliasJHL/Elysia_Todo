import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn } from "typeorm"

export enum TodoStatus {
    NOT_STARTED = "NOT_STARTED",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
  }

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'title': string;

    @Column()
    'description': string;

    @Column('timestamp')
    'created_at': Date;

    @Column('timestamp')
    'due_time': Date;

    @Column('enum', { enum: TodoStatus, default: TodoStatus.NOT_STARTED })
    'status': TodoStatus;

    @Column()
    @JoinColumn({ name: "user_id" })
    'user_id': number;
}