import React, {useEffect, useState} from 'react';
import apiService from '../../services/apiService'; // Import your API service
import DataTable from '../DataTable/DataTable'; // Import your DataTable component

function DataRetrieval() {
    const [retrievedData, setRetrievedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await apiService.getTransactions(); // Call a new API method (see below)
                setRetrievedData(response.data);
            } catch (err) {
                setError('Error retrieving data.');
                console.error(err); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div>
            <h2>Retrieve Data</h2>
            {loading && <p>Loading data...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>} {/* Display error message */}
            {retrievedData.length > 0 ? (
                <DataTable transactions={retrievedData}/> // Pass retrieved data to DataTable
            ) : !loading && !error ? ( // Check if is not loading and neither has error
                <p>No data retrieved yet.</p>
            ) : null}
        </div>
    );
}

export default DataRetrieval;