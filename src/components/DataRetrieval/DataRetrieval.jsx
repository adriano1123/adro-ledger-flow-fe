import React, { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { Form, Button } from 'react-bootstrap';
import { fetchTransactions } from '../../services/apiService';
import Summary from "../Summary/Summary";

const DataRetrieval = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCard, setSelectedCard] = useState('all');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const handleRetrieve = async () => {
        try {
            setLoading(true);
            // Format date as YYYY-MM-01 (first day of the month)
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const monthParam = `${year}-${month}-01`;

            const data = await fetchTransactions(
                monthParam,  // Pass formatted date
                selectedCard === 'all' ? null : selectedCard
            );
            setTransactions(data);
            //setTotal(data.reduce((sum, t) => sum + t.amount, 0));
            const excludedStrings = ["GRACIAS POR SU PAGO EN BBVA", "BMOVIL.PAGO TDC", "MSI"];
            const sum = data.reduce((sum, t) => {
                const shouldExclude = excludedStrings.some(str => t.description.includes(str));
                return shouldExclude ? sum : sum + t.amount; // Conditional sum
            }, 0);
            setTotal(sum);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to retrieve transactions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="data-retrieval-container">
            <div className="retrieval-controls mb-4">
                <Form.Group className="me-3">
                    <Form.Label>Select Month</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]} // Show full date
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                </Form.Group>

                <Form.Group className="me-3">
                    <Form.Label>Card Type</Form.Label>
                    <Form.Select
                        value={selectedCard}
                        onChange={(e) => setSelectedCard(e.target.value)}
                    >
                        <option value="all">All Cards</option>
                        <option value="AMEXSERVICES">Amex Services</option>
                        <option value="AMEXCREDIT">Amex Credit</option>
                        <option value="BBVA">BBVA</option>
                    </Form.Select>
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleRetrieve}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Retrieve Data'}
                </Button>
            </div>

            <DataTable transactions={transactions} />
            {transactions.length > 0 && (
                <Summary total={total}/>
            )}
        </div>
    );
};

export default DataRetrieval;