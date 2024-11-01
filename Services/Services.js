const URL = "http://localhost:8000/hospital";

export const userRegistration = async (formData) => {
    const response = await axios.post(`${URL}/users`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const doctorRegistration = async (formData) => {
    const response = await axios.post(`${URL}/doctors`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const patientRegistration = async (formData) => {
    const response = await axios.post(`${URL}/patient`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}