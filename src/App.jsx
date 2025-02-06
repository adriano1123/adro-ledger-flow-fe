import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload';
import DataTable from './components/DataTable/DataTable';
import Summary from './components/Summary/Summary';
import './App.css';
import * as apiService from "./services/apiService";
import DataRetrieval from "./components/DataRetrieval/DataRetrieval"; // Import your CSS file

function App() {
    return (
        <Router>
            <aside className="sidebar"> {/* Sidebar for navigation */}
                <h1>Menu</h1> {/* Menu title */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Upload</Link>
                        </li>
                        <li>
                            <Link to="/retrieve">Retrieve Data</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="app-container">
                <h1>💳 Credit Card Statement Processor</h1>

                <Routes>
                    <Route path="/" element={<FileUploadPage/>}/>
                    <Route path="/retrieve" element={<DataRetrievalPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function FileUploadPage() {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiService.uploadFile(file);
            setTransactions(response.data);
            setTotal(response.data.reduce((sum, t) => sum + t.amount, 0));
        } catch (err) {
            setError('Error processing file. Please check the format and try again. ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div> {/* No extra div needed here */}
            <div className="upload-section"> {/* Keep your existing structure */}
                <FileUpload onFileUploaded={handleUpload}/>
                {loading && <div className="loading">Processing...</div>}
                {error && <div className="error">{error}</div>}
            </div>

            {transactions.length > 0 && (
                <div className="results-section">
                    <Summary total={total}/>
                    <DataTable transactions={transactions}/>
                </div>
            )}
        </div>
    );
}

function DataRetrievalPage() {
    return (
        <div>
            <h2>Retrieve Data</h2>
            <DataRetrieval/>
        </div>
    );
}

export default App;