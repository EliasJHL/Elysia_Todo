import { Elysia } from "elysia";
import { AppDataSource } from "data-source";
import { Todo } from "@entity/Todo";
import { User } from "@entity/User";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie'
import bcrypt from 'bcryptjs';
import { todo } from "node:test";

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
        //=================
        // Get user profile
        //=================
        .get('/', async ({ body, jwt, cookie: { auth }, params}) => {
            const profile = await jwt.verify(auth.value)
        
            if (!profile) {
                return { status: 401, body:'Unauthorized' }
            }

            const user_repo = AppDataSource.getRepository(User)

            const user = await user_repo.findOne({
                where: {email: profile.email}
            });

            if (!user) {
                return { status: 401, body:'Unauthorized' }
            }

            return { status: 200, body: user };
        })
)
