import React, { useState } from 'react';
import './styles.css';
import TransactionForm from './TransactionForm';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClick = () => {
    setIsFormVisible(!isFormVisible);
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
              <TransactionForm />
            </div>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          Expense Breakdown
        </div>
        <div className="card-body">
          <div className="chart-container">
            <div className="chart-placeholder">
              <p>Pie chart will appear here</p>
              <p>Add some transactions to see your spending breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
