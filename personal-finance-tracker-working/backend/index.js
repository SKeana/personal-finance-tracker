// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

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

// PUT (Update) an existing transaction by ID
app.put('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const { date, amount, category, description } = req.body;

    db.run(
        'UPDATE transactions SET date = ?, amount = ?, category = ?, description = ? WHERE id = ?',
        [date, amount, category, description, transactionId],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update transaction' });
            }

            db.get('SELECT * FROM transactions WHERE id = ?', [transactionId], (err, row) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to retrieve transaction' });
                }

                res.status(200).json({ message: 'Transaction updated successfully', transaction: row });
            });
        }
    );
});

// DELETE a transaction by ID
app.delete('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;

    db.run('DELETE FROM transactions WHERE id = ?', [transactionId], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete transaction' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully', changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
