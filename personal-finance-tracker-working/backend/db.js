// backend/db.js
const sqlite3 = require('sqlite3').verbose();

// Create a new database or connect to an existing one
const db = new sqlite3.Database('./transactions.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Serialize database operations
db.serialize(() => {
  // Create the transactions table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create table:', err.message);
      throw err;
    } else {
      console.log('Transactions table created or already exists.');
    }
  });

  // Create the category table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Failed to create categories table:', err.message);
      throw err;
    } else {
      console.log('Categories table created or already exists.');
    }
  });
});

module.exports = db;
