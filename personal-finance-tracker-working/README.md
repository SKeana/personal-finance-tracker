# Personal Finance Tracker

A small full-stack app for logging personal transactions and visualizing spending by category. The frontend is a React (Create React App) client that lets you add transactions and see an expense breakdown chart. The backend is an Express REST API backed by SQLite.

## Tech stack

- **Frontend:** React 19, Chart.js, react-chartjs-2, Create React App
- **Backend:** Node.js, Express, SQLite (`sqlite3`)

## Features

- Add new transactions (date, amount, category, description)
- View a table of recent transactions
- Visualize spending per category with a Chart.js chart

## Project structure

```
personal-finance-tracker-working/
├── package.json              # React frontend
├── public/
├── src/
│   ├── App.js                # Main UI (transaction list + chart toggle)
│   ├── TransactionForm.js    # Form for adding a transaction
│   ├── ExpenseChart.js       # Chart.js category breakdown
│   └── styles.css
└── backend/
    ├── index.js              # Express server (port 5000)
    ├── db.js                 # SQLite schema (transactions, categories)
    └── transactions.db       # SQLite database file (auto-created)
```

## API

Base URL: `http://localhost:5000`

| Method | Path                | Description                  |
| ------ | ------------------- | ---------------------------- |
| GET    | `/transactions`     | List all transactions        |
| POST   | `/transactions`     | Create a new transaction     |
| PUT    | `/transactions/:id` | Update a transaction by id   |
| DELETE | `/transactions/:id` | Delete a transaction by id   |

A transaction has the shape:

```json
{
  "date": "YYYY-MM-DD",
  "amount": 0.00,
  "category": "string",
  "description": "string"
}
```

## Setup

### 1. Backend

```bash
cd backend
npm install express cors sqlite3
node index.js
```

The SQLite database file (`transactions.db`) and tables are created automatically on first run. The server listens on port `5000`.

### 2. Frontend

In a separate terminal, from the project root:

```bash
npm install
npm start
```

The React app runs on `http://localhost:3000`.

> Note: the current `App.js` keeps transactions in component state. To persist them via the backend, wire `TransactionForm` and the list/chart to the `/transactions` endpoints with `axios` or `fetch`.

## Available scripts

- `npm start` — run the React dev server
- `npm run build` — production build
- `npm test` — run the test runner
