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

const apiService = {
    uploadFile
};

export default apiService;