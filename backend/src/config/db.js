import Database from "better-sqlite3";

export function createConnection(
  filename = process.env.DB_PATH ?? "tickets.db",
) {
  const db = new Database(filename);

  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

  return db;
}

const db = createConnection();

export default db;
