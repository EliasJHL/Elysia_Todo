import { Elysia } from "elysia";
import { database } from "@database/database";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';

export default new Elysia({"name": "users"}).group("/users", (group) =>
    group
        .use(
            jwt({
              name: "jwt",
              secret: process.env.JWT_SECRET ||
                "default_secret",
            })
        )
        .use(cookie())
        .get("/", async () => {
            return "Hello, Users!";
        })
        .post("/register", async ({ body, jwt, cookie: { auth }}) => {
            const params = body as { name: string, email: string, password: string}

            auth.set({
                value: await jwt.sign(params),
                httpOnly: true,
                maxAge: 7 * 86400,
            })

            return `Sign in as ${auth.value}`;
        })
        .get('/login/:name', async ({ body, jwt, cookie: { auth }, params }) => {
            const profile = await jwt.verify(auth.value)

            if (!profile) {
                return 'Invalid token'
            }

            return `Hello, ${profile.name}`
        })
        .get("/:id", async ({ params }) => {
            return `Hello, User ${params.id}!`;
        })
);
    