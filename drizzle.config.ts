import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@127.0.0.1:5432/gator?sslmode=disable"
  },
  verbose: true,
});
