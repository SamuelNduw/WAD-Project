const URL = "http://localhost:8000/hospital";

export const userRegistration = async (formData) => {
    const response = await axios.post(`${URL}/users/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const doctorRegistration = async (formData) => {
    const response = await axios.post(`${URL}/doctors/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const patientRegistration = async (formData) => {
    const response = await axios.post(`${URL}/patients/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const login = async (formData) => {
    const response = await axios.post(`${URL}/login/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

export const userPrescriptions = async (patientId) => {
    const response = await axios.get(`${URL}/prescriptions/?patient_id=${patientId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response;
}

export const makePrescription = async (formData) => {
    const response = await axios.post(`${URL}/prescriptions/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}
export const makeAppointment = async (formData) => {
    const response = await axios.post(`${URL}/appointments/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}

export const getAppointmentsByPatientId = async (formData) => {
    const response = await axios.post(`${URL}/appointment/by-patient/`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export const getPatientIdWithUserInfo = async (username, email) => {
    const response = await axios.get(`${URL}/get-patient-id/${username}/${email}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}