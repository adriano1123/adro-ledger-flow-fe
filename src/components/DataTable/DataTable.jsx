import { Table } from 'react-bootstrap';
import './DataTable.css';

const DataTable = ({ transactions = [] }) => {
    return (
        <div className="data-table-container">
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Card Type</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                        <td>{transaction.description}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                        <td>{transaction.sourceType}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;