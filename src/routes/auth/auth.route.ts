import { Elysia } from "elysia";
import { AppDataSource } from "data-source";
import { Todo } from "@entity/Todo";
import { User } from "@entity/User";
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie'
import bcrypt from 'bcryptjs';

export default new Elysia({"name": "auth"}).group("/auth", (group) =>
    group
        .use(cookie())
        .use(
            jwt({
              name: "jwt",
              secret: process.env.JWT_SECRET ||
                "default_secret",
            })
        )
        .post("/register", async ({ body, jwt, cookie: { auth }}) => {
            const params = body as { name: string, email: string, password: string, firstname: string}
        
            if (!params.email || !params.password || !params.name || !params.firstname) {
                return { status: 400, body:'Invalid parameters' }
            }
        
            const user_repo = AppDataSource.getRepository(User)
        
            const user = await user_repo.findOne({
                where: {email: params.email}
            });
        
            if (user) {
                return { status: 400, body:'User already exists' }
            } else {
                const hashed_password = await bcrypt.hash(params.password, 10)
                const new_user = user_repo.create({
                    name: params.name,
                    email: params.email,
                    password: hashed_password,
                    firstname: params.firstname,
                })
            
                await user_repo.save(new_user)
            }
        
            auth.set({
                value: await jwt.sign(params),
                httpOnly: true,
                maxAge: 7 * 86400,
            })
        
            return { status: 200, body:`Sign in as ${auth.value}` };
        })
        .get('/check-account-validity', async ({ body, jwt, cookie: { auth }, params}) => {
            const profile = await jwt.verify(auth.value)
        
            if (!profile) {
                return { status: 401, body:'Unauthorized' }
            }
        
            return { status: 200, body:`Hello, ${profile.name}` }
        })
        .post('/login', async ({ body, jwt, cookie: { auth }}) => {
            const params = body as { email: string, password: string}
        
            if (!params.email || !params.password) {
                return { status: 400, body:'Invalid parameters' }
            }
        
            const user_repo = AppDataSource.getRepository(User)
        
            const user = await user_repo.findOne({
                where: {email: params.email}
            });
        
            if (!user) {
                return { status: 404, body:'User not found' }
            }
        
            const is_valid = await bcrypt.compare(params.password, user.password)
        
            if (!is_valid) {
                return { status: 400, body:'Invalid parameters' }
            }
        
            auth.set({
                value: await jwt.sign(params),
                httpOnly: true,
                maxAge: 7 * 86400,
            })
        
            return { status: 200, body:`Sign in as ${auth.value}` };
        })
);
