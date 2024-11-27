import { Elysia } from "elysia";
import  CoordRoute  from "./routes/coord/coord.route";
import { AppDataSource } from "./data-source";
import "reflect-metadata";

await AppDataSource.initialize();

const app = new Elysia()
  .use(CoordRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
