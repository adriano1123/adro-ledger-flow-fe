import React from 'react';

function TotalAmount({data}) {
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    return (
        <div style={{marginTop: '20px', fontWeight: 'bold'}}>
            Total Amount: ${total.toFixed(2)}
        </div>
    );
}

export default TotalAmount;