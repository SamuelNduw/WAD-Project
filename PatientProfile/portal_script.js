import { userPrescriptions, getAppointmentsByPatientId } from '../Services/Services.js';

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length == 2) return parts.pop().split(';').shift();
    return null;
  }

// Patient Prescriptions
let prescriptionsData = [];

const patientId = getCookie('roleId');
const getPrescriptions = async (patientId) => {
    try{
        const prescriptionsResponse = await userPrescriptions(patientId);
        prescriptionsData = prescriptionsResponse.data;
        console.log(prescriptionsData)

        prescriptionsData.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${record.date_issued}</td><td>${record.medication_name}</td><td>${record.instructions}</td><td>${record.dosage}</td>`;
            document.getElementById('history-list').appendChild(row);
        });
    } catch(e){
        console.error("Error fetching prescriptions: ", e);
    }
}
getPrescriptions(patientId);


// Prescriptions Sample Data
// const appointmentsData = [];

const getAppointments = async (patientId) => {
    try{
        const json = {
            patient_id: patientId
        }
        const appointmentsResponse = await getAppointmentsByPatientId(json);
        const appointmentsData = appointmentsResponse.data;
        console.log(appointmentsData);

        appointmentsData.forEach(record => {
            const appointmentDate = new Date(record.appointment_date);

            // Extract the date in "YYYY-MM-DD" format
            const date = appointmentDate.toISOString().split('T')[0];

            // Extract the time in "HH:mm:ss" format
            const time = appointmentDate.toISOString().split('T')[1].split('Z')[0];

            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${date}</td>
            <td>${time}</td>
            <td>${record.reason_for_visit}</td>
            <td>${record.doctor_info.first_name} ${record.doctor_info.last_name}</td>`
            document.getElementById('appointment-list').appendChild(row);
        });
    } catch(e){
        console.error('Error fetching appointments: ', e);
    }
}
getAppointments(patientId);

// Messaging with Doctor
document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const doctorId = document.getElementById('doctor-id').value;
    const message = document.getElementById('message').value;
    const messageItem = document.createElement('div');
    messageItem.textContent = `Patient: ${message}`;
    document.getElementById('chat-box').appendChild(messageItem);
    document.getElementById('message').value = '';

    // Simulate doctor response based on selected doctor
    setTimeout(() => {
        const response = document.createElement('div');
        response.textContent = `Doctor (${doctorId === 'matheus' ? 'Dr. Matheus Astofel' : 'Dr. Jason Petrus'}): Thank you for your message.`;
        document.getElementById('chat-box').appendChild(response);
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }, 1000);
});
