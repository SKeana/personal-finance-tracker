// src/App.js
import React, { useState } from 'react';
import './App.css';
import TransactionForm from './TransactionForm'; // Import the form

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  const handleClick = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>
          {isFormVisible ? 'Hide Transaction Form' : 'Add Transaction'}
        </button>
      </header>
      <main>
        {isFormVisible && <TransactionForm />} {/* Conditionally render the form */}
        {/* Pie chart will go here later */}
      </main>
    </div>
  );
}

export default App;
