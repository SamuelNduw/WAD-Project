// Appointment Booking and Display
// document.getElementById('appointment-form').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const doctor = document.getElementById('doctor').value;
//     const date = document.getElementById('date').value;
//     const time = document.getElementById('time').value;

//     const appointment = `${doctor} - ${date} at ${time} <button onclick="cancelAppointment(this)">Cancel</button>`;
//     const listItem = document.createElement('li');
//     listItem.innerHTML = appointment;
//     document.getElementById('appointment-list').appendChild(listItem);
// });

// Cancel Appointment Function
function cancelAppointment(button) {
    button.parentElement.remove();
}

// Medical History Sample Data
const historyData = [
    { date: '2023-08-15', diagnosis: 'Flu', treatment: 'Rest and fluids', prescription: 'Ibuprofen 200mg' },
    { date: '2023-05-22', diagnosis: 'Sprained Ankle', treatment: 'Brace and physiotherapy', prescription: 'Pain relievers' }
];

historyData.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${record.date}</td><td>${record.diagnosis}</td><td>${record.treatment}</td><td>${record.prescription}</td>`;
    document.getElementById('history-list').appendChild(row);
});

// Prescriptions Sample Data
const prescriptions = [
    'Ibuprofen 200mg - Take one every 4 hours as needed',
    'Antibiotic - Complete full course, twice a day for 7 days'
];

prescriptions.forEach(prescription => {
    const item = document.createElement('li');
    item.textContent = prescription;
    document.getElementById('prescription-list').appendChild(item);
});

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
