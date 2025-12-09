import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  return open({
    filename: "./database/hope_map.db",
    driver: sqlite3.Database
  });
}
