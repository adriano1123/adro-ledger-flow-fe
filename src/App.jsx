import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload';
import './App.css';
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
                <h1 className="card-title text-purple mb-4">💳 The Mighty Conchitas Credit Card Statement Wizard</h1>

                <Routes>
                    <Route path="/" element={<FileUploadPage/>}/>
                    <Route path="/retrieve" element={<DataRetrievalPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function FileUploadPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async (file) => {
        try {
            setLoading(true);
            setError(null);
        } catch (err) {
            setError('Error processing file. Please check the format and try again. ' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="data-module-container"> {/* No extra div needed here */}
            <div className="upload-section"> {/* Keep your existing structure */}
                <FileUpload onFileUploaded={handleUpload}/>
                {loading && <div className="loading">Processing...</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}

function DataRetrievalPage() {
    return (
        <div className="data-module-container">
            <h2 className="card-title text-purple mb-4">🔍Retrieve Data</h2>
            <DataRetrieval/>
        </div>
    );
}

export default App;