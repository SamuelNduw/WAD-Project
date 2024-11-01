const URL = "http://localhost:8000/hospital";

const userRegistration = async (formData) => {
    const response = await axios.post(`${URL}/users/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

const doctorRegistration = async (formData) => {
    const response = await axios.post(`${URL}/doctors/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

const patientRegistration = async (formData) => {
    const response = await axios.post(`${URL}/patients/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export { userRegistration, doctorRegistration, patientRegistration };