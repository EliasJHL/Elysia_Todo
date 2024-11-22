import { connect } from 'ts-postgres';

interface Greeting {
  message: string;
}

const client = await connect({
    host: "localhost",
    port: 5432,
    database: process.env.POSTGRES_DB || "elysia-todo",
    user: process.env.POSTGRES_USER || "elysia",
    password: process.env.POSTGRES_PASSWORD || "elysia"
});

try {
  const result = client.query<Greeting>(
    "SELECT 'Hello ' || $1 || '!' AS message",
    ['world'],
  );

  for await (const obj of result) {
    console.log(obj.message);
  }
} finally {
  await client.end();
}

module.exports = client;