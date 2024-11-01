// Appointment Booking and Display
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values from the form
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Create appointment display and add a cancel button
    const appointment = `${doctor} - ${date} at ${time} <button onclick="cancelAppointment(this)">Cancel</button>`;
    const listItem = document.createElement('li');
    listItem.innerHTML = appointment;
    
    // Append appointment to the list
    document.getElementById('appointment-list').appendChild(listItem);
});

// Cancel Appointment Function
function cancelAppointment(button) {
    button.parentElement.remove();
}

// Messaging with Doctor
document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values from the message form
    const doctorId = document.getElementById('doctor-id').value;
    const message = document.getElementById('message').value;
    
    // Display patient's message in the chat box
    const messageItem = document.createElement('div');
    messageItem.textContent = `Patient: ${message}`;
    document.getElementById('chat-box').appendChild(messageItem);
    document.getElementById('message').value = '';  // Clear message field

    // Simulate doctor response based on selected doctor
    setTimeout(() => {
        const response = document.createElement('div');
        response.textContent = `Doctor (${doctorId === 'matheus' ? 'Dr. Matheus Astofel' : 'Dr. Jason Petrus'}): Thank you for your message.`;
        
        // Append doctor response and scroll to the bottom of chat
        document.getElementById('chat-box').appendChild(response);
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }, 1000);
});
