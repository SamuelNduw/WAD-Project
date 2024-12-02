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




// Messaging/Chat login

document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");

    const appendMessage = (message, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageDiv;
    };

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userInput = document.getElementById("user-message").value;
        appendMessage(userInput, "user");

        const botMessageDiv = appendMessage("...", "bot"); // Placeholder while waiting for response

        try {
            const response = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "hf.co/HuggingFaceTB/SmolLM2-1.7B-Instruct-GGUF",
                    messages: [
                        { role: "user", content: `${userInput} (give a maximum of two sententes in response)` }
                    ],
                    keep_alive: 180,
                    stream: true,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body
                .pipeThrough(new TextDecoderStream())
                .getReader();

            let botMessage = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (value.trim()) {
                    try {
                        const json = JSON.parse(value);
                        if (json.message && json.message.content) {
                            botMessage += json.message.content;
                            botMessageDiv.textContent = botMessage;
                            chatBox.scrollTop = chatBox.scrollHeight;
                        }
                    } catch (err) {
                        console.error("Error parsing JSON:", err);
                    }
                }
            }
        } catch (error) {
            botMessageDiv.textContent = "Error connecting to Ollama. Please try again later.";
        }

        document.getElementById("user-message").value = "";
    });
});


