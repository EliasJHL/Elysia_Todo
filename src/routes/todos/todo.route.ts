import { Elysia } from "elysia";
import { AppDataSource } from "data-source";
import { Todo } from "@entity/Todo";
import { User } from "@entity/User";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie'
import bcrypt from 'bcryptjs';
import { todo } from "node:test";
import { DateTime } from 'luxon';

export default new Elysia({"name": "todos"}).group("/todos", (group) =>
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
        // Get user todos
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

            const todos_repo = AppDataSource.getRepository(Todo)

            const todos = await todos_repo.find({
                where: {user_id: user.id}
            });

            return { status: 200, body: todos };
        })
        //=================
        // Create a todo
        //=================
        .post('/add', async ({ body, jwt, cookie: { auth }}) => {
            const params = body as { title: string, description: StringConstructor}
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

            const todos_repo = AppDataSource.getRepository(Todo)

            const new_todo = todos_repo.create({
                title: params.title,
                description: params.description,
                user_id: user.id
            })

            await todos_repo.save(new_todo)

            return { status: 200, body: new_todo };
        })
);
    