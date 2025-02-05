import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import DataTable from './components/DataTable/DataTable';
import apiService from './services/apiService';

function App() {

    const [transactions, setTransactions] = useState([]);
      //const [total, setTotal] = useState(0);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const handleUpload = async (file) => {
        try {
          setLoading(true);
          setError(null);
          const response = await apiService.uploadFile(file);
          setTransactions(response.data);
          //setTotal(response.data.reduce((sum, t) => sum + t.importe, 0));
        } catch (err) {
          setError('Error processing file. Please check the format and try again.');
        } finally {
          setLoading(false);
        }
      };

  return (
      <div className="app-container">
        <h1>💳 Credit Card Statement Processor</h1>

        <div className="upload-section">
          <FileUpload onFileUploaded={handleUpload} />
          {loading && <div className="loading">Processing...</div>}
          {error && <div className="error">{error}</div>}
        </div>

        {transactions.length > 0 && (
          <div className="results-section">
            <DataTable transactions={transactions} />
          </div>
        )}
      </div>
    );
}

export default App;