import React, { useState, useEffect, useCallback } from 'react';
import './Summary.css';

const Summary = ({ transactions }) => {
    const [total, setTotal] = useState(0);

    const handleSummary = useCallback(() => {
        const excludedStrings = ["GRACIAS POR SU PAGO EN BBVA", "BMOVIL.PAGO TDC", "MSI"];
        return transactions.reduce((sum, t) => {
            const shouldExclude = excludedStrings.some(str => t.description.includes(str));
            return shouldExclude ? sum : sum + t.amount;
        }, 0);
    }, [transactions]);

    useEffect(() => {
        const sum = handleSummary();
        setTotal(sum);
    }, [handleSummary]);

    return (
        <div className="summary-container">
            <h3>Total Amount Processed</h3>
            <div className="total-amount">
                ${total.toFixed(2)}
            </div>
            <div className="each-person">
                {/* ... */}
            </div>
        </div>
    );
};

export default Summary;