import Database from 'better-sqlite3';

export function CreateConnection(filename = process.env.DB_PATH ?? 'tickets.db') {
    const db = new Database(filename);

    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    return db;
}