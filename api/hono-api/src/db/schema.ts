import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from 'drizzle-zod';

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: int().notNull(),
    email: text().notNull().unique(),
});
const insertUserSchema = createInsertSchema(usersTable);

export { insertUserSchema }