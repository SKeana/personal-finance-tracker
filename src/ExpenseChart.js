import React, { useState } from 'react';
import './styles.css';
import TransactionForm from './TransactionForm';
import ExpenseChart from './ExpenseChart';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setIsFormVisible(false); // Hide form after adding transaction
  };

  return (
    <div className="container fade-in">
      <header className="header">
        <h1>Personal Finance Tracker</h1>
        <p>Track your expenses and visualize your spending habits</p>
      </header>
      
      <div className="card">
        <div className="card-header">
          Transaction Management
        </div>
        <div className="card-body">
          <button 
            onClick={handleClick}
            className={`btn ${isFormVisible ? 'btn-danger' : 'btn-primary'}`}
          >
            {isFormVisible ? 'Hide Form' : 'Add New Transaction'}
          </button>
          
          {isFormVisible && (
            <div className="form-container fade-in" style={{ marginTop: '20px' }}>
              <TransactionForm onAddTransaction={addTransaction} />
            </div>
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
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.category}</td>
                      <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                      <td>{transaction.description}</td>
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
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default App;
