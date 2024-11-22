import { connect, Client } from 'ts-postgres';

export const database = async (): Promise<Client> => {
    const client = await connect({
      host: "localhost",
      port: 5435,
      database: process.env.POSTGRES_DB || "elysia-todo",
      user: process.env.POSTGRES_USER || "elysia",
      password: process.env.POSTGRES_PASSWORD || "elysia"
    });

    return client;
};