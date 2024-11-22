SELECT 'CREATE DATABASE elysia-todo'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'elysia-todo')\gexec

\c elysia-todo;

CREATE TYPE todo_status AS ENUM ('not started', 'todo', 'in progress', 'done');

CREATE TABLE IF NOT EXISTS "user"
(
    id INT NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "todo"
(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_time TIMESTAMP NOT NULL,
    status todo_status NOT NULL DEFAULT 'not started',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);