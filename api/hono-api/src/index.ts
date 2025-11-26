import { serve } from '@hono/node-server'
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { Hono } from 'hono'
import { usersTable, insertUserSchema } from './db/schema.js';
import 'dotenv/config';
import { zValidator } from '@hono/zod-validator';


const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle(client);

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))
app.get('/users', async (c) => {
  const users = await db.select().from(usersTable);
  return c.json(users);
})

app.post('/users', zValidator('json', insertUserSchema), async (c) => {
  const user = c.req.valid('json');
  const users = await db.insert(usersTable).values(user).returning();
  return c.json(users);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})