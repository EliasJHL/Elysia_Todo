import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'email': string;

    @Column()
    'password': string;

    @Column()
    'name': string;

    @Column()
    'firstname': string;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    'created_at': Date;
}