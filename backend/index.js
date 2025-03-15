// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./DB');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// GET all transactions
app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
    res.json(rows);
  });
});

// POST a new transaction
app.post('/transactions', (req, res) => {
  const { date, amount, category, description } = req.body;

  db.run(
    'INSERT INTO transactions (date, amount, category, description) VALUES (?, ?, ?, ?)',
    [date, amount, category, description],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to create transaction' });
      }

      db.get('SELECT last_insert_rowid() AS id', (err, row) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Failed to retrieve transaction id' });
        }

        const newTransaction = {
          id: row.id,
          date: date,
          amount: amount,
          category: category,
          description: description,
        };

        res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
