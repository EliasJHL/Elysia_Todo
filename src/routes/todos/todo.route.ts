import { Elysia } from "elysia";

export default new Elysia({"name": "todos"}).group("/todos", (group) =>
    group
        .get("/", async () => {
            return "Hello, Todos!";
        })
        .get("/:id", async ({ params }) => {
            return `Hello, Todo ${params.id}!`;
        })
);
    