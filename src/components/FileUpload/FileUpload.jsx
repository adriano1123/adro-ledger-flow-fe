import { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import './FileUpload.css';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cardType, setCardType] = useState('BBVA');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch(`http://localhost:8080/upload?storeFile=true&cardName=${cardType}`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            setResponse({
                message: data.message,
                success: res.status === 201,
                location: res.headers.get('Location')
            });

        } catch (error) {
            setResponse({
                message: 'Failed to connect to server',
                success: false
            });
        }
    };

    return (
        <div className="file-upload-container">
            <h2 className="card-title text-purple mb-4">📤 Upload Transactions File</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Card Type</Form.Label>
                    <Form.Select
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                    >
                        <option value="AMEXSERVICES">Amex Services</option>
                        <option value="AMEXCREDIT">Amex Credit</option>
                        <option value="BBVA">BBVA</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select CSV File</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".csv"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Upload</Button>

                {response && (
                    <Alert
                        variant={response.success ? 'success' : 'danger'}
                        className="mt-3"
                    >
                        {response.message}
                        {response.location && (
                            <div className="mt-2">
                                <small>Location: {response.location}</small>
                            </div>
                        )}
                    </Alert>
                )}
            </Form>
        </div>
    );
};

export default FileUpload;