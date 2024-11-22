import { Elysia } from "elysia";
import { client } from "@database/database";

export default new Elysia({"name": "users"}).group("/users", (group) =>
    group
        .get("/", async () => {
            return "Hello, Users!";
        })
        .get("/:id", async ({ params }) => {
            return `Hello, User ${params.id}!`;
        })
);
    