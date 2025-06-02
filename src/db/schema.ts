import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the user table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
