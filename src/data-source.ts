import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Todo } from "./entity/Todo";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "elysia",
    password: "elysia",
    database: "elysia-todo",
    synchronize: true,
    logging: true,
    entities: [User, Todo],
    subscribers: [],
    migrations: [],
})