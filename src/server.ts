import Express = require("express");
import cors from "cors";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import routes from "./routes";

const app=Express();

app.use(cors());
app.use(Express.json());

// connect sqlite
const sqlite = new Database("./db/database.db");
export const db=drizzle(sqlite)

// API routes
app.use("/api", routes);

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});