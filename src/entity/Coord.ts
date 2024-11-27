import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn } from "typeorm"

@Entity()
export class Coord {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    'date': Date;

    @Column({default: null})
    'lat': number;

    @Column({default: null})
    'lng': number;

    @Column({default: null})
    'limit': number;

    @Column({default: null})
    'speed': number;
}