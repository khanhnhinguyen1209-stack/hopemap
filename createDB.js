import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function main() {
  const db = await open({ filename: "./database/hope_map.db", driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  console.log("✅ Bảng users đã được tạo!");
  await db.close();
}

main();
