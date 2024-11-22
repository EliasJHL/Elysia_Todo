import { Elysia } from "elysia";

export default new Elysia({"name": "auth"}).group("/auth", (group) =>
    group
        .get("/", async () => {
            return "Hello, auth!";
        })
        .get("/:id", async ({ params }) => {
            return `Hello, Auth ${params.id}!`;
        })
);
    