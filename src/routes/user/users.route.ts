import { Elysia } from "elysia";
import { AppDataSource } from "data-source";
import { Todo } from "@entity/Todo";
import { User } from "@entity/User";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie'
import bcrypt from 'bcryptjs';

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
)
    