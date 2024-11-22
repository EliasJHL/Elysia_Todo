import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { cors } from '@elysiajs/cors'
import AuthRoute from "./routes/auth/auth.route";
import userRoute from "./routes/user/users.route";
import todoRoute from "./routes/todos/todo.route";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET ||
        "defautl_secret",
    })
  )
  .use(cookie())
  .use(AuthRoute)
  .use(userRoute)
  .use(todoRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
