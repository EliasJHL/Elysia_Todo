import { Elysia } from "elysia";

export default new Elysia({"name": "users"}).group("/users", (group) =>
    group
        .get("/", async () => {
            return "Hello, Users!";
        })
        .get("/:id", async ({ params }) => {
            return `Hello, User ${params.id}!`;
        })
);
    