import React from 'react';
import './DataTable.css';

function DataTable({ transactions }) {
  return (
      <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Purchase Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Account</th>
                <th>cardHolder</th>
                <th>Changed</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className={transaction.hasChanged ? 'changed' : ''}>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.purchaseDate}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.account}</td>
                  <td>{transaction.cardHolder}</td>
                  <td>{transaction.hasChanged ? '✅' : '🔄'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
}

export default DataTable;