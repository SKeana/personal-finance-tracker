import React, { useState, useEffect } from 'react';
import './styles.css';
import TransactionForm from './TransactionForm';
import ExpenseChart from './ExpenseChart';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/transactions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
        setFetchError(null);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setFetchError('Failed to load transactions.');
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error(`Failed to add transaction. HTTP status ${response.status}`);
      }

      const newTransaction = await response.json(); // Assuming the API returns the new transaction
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    } catch (error) {
      console.error('Add transaction failed', error);
    }
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      // Make an API request to your backend here to UPDATE the transaction
      const response = await fetch(`http://localhost:5000/transactions/${updatedTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        throw new Error(`Failed to update transaction. HTTP status ${response.status}`);
      }

      const updatedData = await response.json(); // Assuming the API returns the updated transaction
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction.id === updatedTransaction.id ? updatedData : transaction
        )
      );
       setEditingTransactionId(null);
        setEditingTransaction(null);
    } catch (error) {
      console.error('Update transaction failed', error);
    }
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    setEditingTransactionId(id);
    setEditingTransaction(transactionToEdit || null);
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
    setEditingTransaction(null);
  };

  return (
    <div className="container fade-in">
      <header className="header">
        <h1>Personal Finance Tracker</h1>
        <p>Track your expenses and visualize your spending habits</p>
      </header>

      <div className="card">
        <div className="card-header">Transaction Management</div>
        <div className="card-body">
          {fetchError && <div className="alert alert-danger">{fetchError}</div>}

          {editingTransactionId === null ? (
            <TransactionForm onAddTransaction={handleAddTransaction} />
          ) : (
            editingTransaction ? (
              <TransactionForm
                transaction={editingTransaction}
                onAddTransaction={handleAddTransaction}
                onUpdateTransaction={handleUpdateTransaction}
                onCancel={handleCancelEdit}
              />
            ) : (
              <p>Transaction not found</p>
            )
          )}

          {transactions.length > 0 && (
            <div className="transaction-list" style={{ marginTop: '20px' }}>
              <h3>Recent Transactions</h3>
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.category}</td>
                      <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditTransaction(transaction.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
       <div className="card">
        <div className="card-header">
          Expense Breakdown
        </div>
        <div className="card-body">
          {transactions.length > 0 && ( // Only load the chart when there are transactions
            <ExpenseChart transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

