import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Create postgres connection
const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export schema for use in other files
export * from "./schema";
