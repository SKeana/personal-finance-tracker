// import
import React from 'react';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Button clicked!'); 
  };

  return (
    <div className="finance-added">
      <header className="finance-added-header">
        <button onClick={handleClick}>Add Transaction</button>
      </header>
      <main>
        {/* Pie chart will go here later */}
      </main>
    </div>
  );
}

export default App;
