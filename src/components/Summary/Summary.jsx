import React from 'react';
import './Summary.css';

const Summary = ({total}) => (
    <div className="summary-container">
        <h3>Total Amount Processed</h3>
        <div className="total-amount">
            ${total.toFixed(2)}
        </div>
    </div>
);

export default Summary;