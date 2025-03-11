import React, { useState } from 'react';

function TransactionForm({ transaction, onAddTransaction, onUpdateTransaction, onCancel }) {
  const [date, setDate] = useState(transaction ? transaction.date : '');
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [category, setCategory] = useState(transaction ? transaction.category : '');
  const [description, setDescription] = useState(transaction ? transaction.description : '');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transactionData = {
      date: date,
      amount: parseFloat(amount),
      category: category,
      description: description,
    };

    try {
      let response;
      if (transaction) {
        // Update existing transaction
        response = await fetch(`http://localhost:5000/transactions/${transaction.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        });
      } else {
        // Create new transaction
        response = await fetch('http://localhost:5000/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Transaction saved:', data.transaction);
      if (transaction) {
        onUpdateTransaction(data.transaction);
      } else {
        onAddTransaction(data.transaction);
      }

    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="form-control"
            />
          </div>
        </div>

        <div className="form-col">
          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-control form-select"
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Housing">Housing</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Shopping">Shopping</option>
          <option value="Personal">Personal</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details about this transaction"
          rows="3"
          className="form-control"
        />
      </div>

      <button
        type="submit"
        className="btn btn-success"
      >
        {transaction ? 'Update Transaction' : 'Add Transaction'}
      </button>
      {transaction && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TransactionForm;
