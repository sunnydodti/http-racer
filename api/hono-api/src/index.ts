import { serve } from '@hono/node-server'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { Hono } from 'hono'
import { usersTable } from './db/schema.js';
import 'dotenv/config';

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle(client);

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.get('/users', async (c) => {
  const users = await db.select().from(usersTable);
  return c.json(users);
})

app.post('/users', async (c) => {
  const body = await c.req.json();
  const {name, age, email} = body;
  const user: typeof usersTable.$inferInsert = {
    name: name.toString(),
    age: Number(age.toString()),
    email: email.toString()
  }
  const users = await db.insert(usersTable).values(user).returning();
  // const users = await db.select().from(usersTable);
  return c.json(users);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})