export const uploadFile = async (file, cardType) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`http://localhost:8080/upload?storeFile=true&cardName=${cardType}`, {
        method: 'POST',
        body: formData,
    });

    return {
        status: response.status,
        data: await response.json(),
        location: response.headers.get('Location')
    };
};

export const fetchTransactions = async (dateString, cardType) => {
    const endpoint = cardType
        ? `retrieveAllByCardType?month=${dateString}&cardName=${cardType}`
        : `retrieveAllByMonth?month=${dateString}`;

    const response = await fetch(`http://localhost:8080/${endpoint}`, {
        cache: 'no-cache',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });

    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
};