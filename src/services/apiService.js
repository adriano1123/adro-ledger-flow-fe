import axios from 'axios';

const API_URL = 'http://localhost:8080/upload'; // Your backend API URL

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storeFile', 'true');
    formData.append('cardName', 'BBVA');

    return await axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getTransactions = async () => {
    try {
        const response = await axios.get('http://localhost:8080/transactions'); // Replace with your actual endpoint
        return response;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error; // Re-throw the error to be caught by the component
    }
};

const apiService = {
    uploadFile
};

export default apiService;