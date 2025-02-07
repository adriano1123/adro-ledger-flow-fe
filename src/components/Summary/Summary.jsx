import React, { useState, useEffect, useCallback } from 'react';
import './Summary.css';

const Summary = ({ transactions }) => {
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [cards, setCards] = useState([]);

    const excludedStrings = ["GRACIAS POR SU PAGO EN BBVA", "BMOVIL.PAGO TDC", "MSI"];

    const handleSummary = useCallback(() => {
        return transactions.reduce((sum, t) => {
            const shouldExclude = excludedStrings.some(str => t.description.includes(str));
            return shouldExclude ? sum : sum + t.amount;
        }, 0);
    }, [transactions]);

    const getUsersAmounts = useCallback(() => {
        return transactions
            .filter(({ description }) => !excludedStrings.includes(description))
            .reduce((acc, { cardHolder, amount }) => {
                acc[cardHolder] = (acc[cardHolder] || 0) + amount;
                return acc;
        }, {});
    }, [transactions]);

    const getCardsAmounts = useCallback(() => {
        return transactions
            .filter(({ description }) => !excludedStrings.includes(description))
            .reduce((acc, { sourceType, amount }) => {
                acc[sourceType] = (acc[sourceType] || 0) + amount;
                return acc;
            }, {});
    }, [transactions]);


    useEffect(() => {
        const sum = handleSummary();
        setTotal(sum);
        const userTotals = getUsersAmounts();
        setUsers(Object.entries(userTotals).map(([name, amount]) => ({ name, amount })));
        const cardsTotals = getCardsAmounts();
        setCards(Object.entries(cardsTotals).map(([sourceType, amount]) => ({ sourceType, amount })));
    }, [handleSummary, getUsersAmounts]);

    return (
        <div className="summary-container">
            {/* Image at the top */}
            <img
                src="https://mcgeheeclinic.com/wp-content/uploads/2024/04/cat-watery-eye.jpg"
                alt="Summary Image"
                className="summary-image"
            />

            <div className="summary-content">
                <div className="summary-section users">
                    <h4>Users</h4>
                    {users.map((user, index) => (
                        <div key={index} className="summary-item">
                            <span>{user.name}</span>
                            <span>${user.amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="summary-section cards">
                    <h4>Cards</h4>
                    {cards.map((card, index) => (
                        <div key={index} className="summary-item">
                            <span>{card.sourceType}</span>
                            <span>${card.amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="total-amount">
                <h3>Total Amount Processed</h3>
                <div className="amount">${total.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default Summary;