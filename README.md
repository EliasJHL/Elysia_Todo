# Todo Backend App

## Presentation
Created using [ElydiaJS](https://elysiajs.com/)

Basic project creating a backend of a Todo app, based of the same project [EpyTodo](https://github.com/EliasJHL/EPyTodo) using ExpressJS

## Database
The database is managed with [TypeORM](https://typeorm.io/) an ORM tool in TypeScript the models are in `/src/entity/`.

The connection creditals are avaiable in the `docker-compose.yml` and `src/data-source.ts`.

### docker-compose.yml
The database identifiers are managed on the environnement
```yml
x-environment: &environment
  POSTGRES_USER: elysia
  POSTGRES_PASSWORD: elysia
  POSTGRES_DB: elysia-todo
```

### data-source.ts
The backend app uses the `AppDataSource` config to setup the tables and the database identifiers

```ts
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5435,
    username: "elysia", // POSTGRES_USER
    password: "elysia", // POSTGRES_PASSWORD
    database: "elysia-todo", // POSTGRES_DB
    synchronize: true,
    logging: true,
    entities: [User, Todo], // The database tables to init
    subscribers: [],
    migrations: [],
})
```

## Start the project

### Database

To start the database we need to run the `docker-compose.yml` file

```bash
sudo docker compose -f docker-compose.yml up --build --force-recreate
```

### The backend App

```bash
npm run dev
```
