import { DataSource } from "typeorm";
import { Coord } from "./entity/Coord";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "elysia",
    password: "elysia",
    database: "elysia-todo",
    synchronize: true,
    logging: true,
    entities: [Coord],
    subscribers: [],
    migrations: [],
})