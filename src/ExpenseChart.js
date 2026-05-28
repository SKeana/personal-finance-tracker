import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ transactions }) {
  // If no transactions, return a message
  if (!transactions || transactions.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-placeholder">
          <p>No transactions to display</p>
          <p>Add some transactions to see your spending breakdown</p>
        </div>
      </div>
    );
  }

  // Process transactions to get category totals
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += parseFloat(amount);
    return acc;
  }, {});

  // Prepare data for the chart
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  // Define colors for the chart (you can customize these)
  const backgroundColors = [
    '#FF6384', // red
    '#36A2EB', // blue
    '#FFCE56', // yellow
    '#4BC0C0', // teal
    '#9966FF', // purple
    '#FF9F40', // orange
    '#8AC249', // green
    '#EA5F89', // pink
    '#00D8B6', // turquoise
    '#955196', // violet
  ];

  // Chart data
  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: backgroundColors.slice(0, categories.length),
        borderColor: backgroundColors.slice(0, categories.length).map(color => color),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default ExpenseChart;
