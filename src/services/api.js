const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            data: data
        });
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

export const createForm = async (formData) => {
    try {
        console.log('Creating form with data:', JSON.stringify(formData, null, 2));
        const response = await fetch(`${API_URL}/forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await handleResponse(response);
        console.log('Form created successfully:', result);
        return result;
    } catch (error) {
        console.error('Error creating form:', error);
        throw error;
    }
};

export const getForms = async () => {
    try {
        console.log('Fetching all forms');
        const response = await fetch(`${API_URL}/forms`);
        const result = await handleResponse(response);
        console.log('Forms fetched successfully:', result);
        return result;
    } catch (error) {
        console.error('Error fetching forms:', error);
        throw error;
    }
};

export const submitResponse = async (formId, responseData) => {
    try {
        console.log('Submitting response for form:', formId);
        console.log('Response data:', responseData);
        const response = await fetch(`${API_URL}/forms/${formId}/responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData),
        });
        const result = await handleResponse(response);
        console.log('Response submitted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error submitting response:', error);
        throw error;
    }
};

export const getFormById = async (formId) => {
    try {
        console.log('Fetching form with ID:', formId);
        const response = await fetch(`${API_URL}/forms/${formId}`);
        const result = await handleResponse(response);
        console.log('Form fetched successfully:', result);
        return result;
    } catch (error) {
        console.error('Error fetching form:', error);
        throw error;
    }
}; 