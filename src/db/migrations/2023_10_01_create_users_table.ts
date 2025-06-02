import { sql } from "drizzle-orm";
import { db } from '../index';

// Note: In Drizzle migrations, we typically use SQL directly rather than schema objects
export async function up() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log('Users table created');
}

export async function down() {
  await db.execute(sql`DROP TABLE IF EXISTS users;`);
  console.log('Users table dropped');
}