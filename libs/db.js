import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs/promises";
import path from "path";

let db = null;

export async function openDb() {
  if (!db) {
    try {
      const dbPath = path.join(process.cwd(), "spreadsheet.sqlite");

      // Check if the file exists, if not, create it
      try {
        await fs.access(dbPath);
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("Database file does not exist. Creating it.");
          await fs.writeFile(dbPath, "");
        } else {
          throw error;
        }
      }

      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS spreadsheets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw new Error(`Failed to initialize database: ${error.message}`);
    }
  }
  return db;
}
