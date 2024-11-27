import { DataSource } from "typeorm";
import { Coord } from "./entity/Coord";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "elysia",
    password: "elysia",
    database: "elysia-todo",
    synchronize: true,
    logging: true,
    entities: [Coord],
    subscribers: [],
    migrations: [],
})