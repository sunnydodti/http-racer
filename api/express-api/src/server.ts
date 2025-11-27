import Express = require("express");
import cors from "cors";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import routes from "./routes";
import fs from "fs";

const app = Express();

app.use(cors());
app.use(Express.json());

// connect sqlite
// try {
// Ensure db folder exists
if (!fs.existsSync("./db")) {
  fs.mkdirSync("./db");
}
  const sqlite = new Database("./db/database.db");
  console.log(sqlite)
  export const db = drizzle(sqlite)
// } catch (e) { console.error(e) };


// API routes
app.use("/api", routes);

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});