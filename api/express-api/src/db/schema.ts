import { text } from "drizzle-orm/sqlite-core";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    age: integer().notNull(),
    email: text().notNull().unique(),
})