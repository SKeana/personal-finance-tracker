// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('transactions.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    )
  `);
});

module.exports = db;
