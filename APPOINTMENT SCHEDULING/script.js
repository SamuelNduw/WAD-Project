import { getPatientIdWithUserInfo, makeAppointment } from "../Services/Services.js";

function getCookie(name){
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`)
  if (parts.length == 2) return parts.pop().split(';').shift();
  return null;
}

document.querySelectorAll('.book-btn').forEach(button => {
  button.addEventListener('click', () => {
    const selectedDate = document.getElementById('datePicker').value;
    // const selectedDoctor = document.getElementById('doctorSelect').value;
    const selectedTime = button.parentElement.textContent.trim().split(' ')[0];
    
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    // Convert selected time (e.g., "9:00 AM") to 24-hour format for ISO string
    const timeParts = selectedTime.split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    if (button.parentElement.textContent.includes("PM") && hours < 12) {
      hours += 12;
    } else if (button.parentElement.textContent.includes("AM") && hours === 12) {
      hours = 0;
    }

    // Combine date and time
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setUTCHours(hours, minutes, 0, 0); // UTC time

    const formattedDate = appointmentDate.toISOString().split('.')[0] + "Z";

    const patientFirstName = prompt('Enter the patient\'s first name:');
    const patientLastName = prompt('Enter the patient\'s last name:');
    const patientUsername = patientFirstName + patientLastName;
    const patientEmail = prompt('Enter the patient\'s email:');
    const reasonForVisit = prompt('Enter the reason for patient\'s appointment:');

    // Logic to make Appointment and store it in db
    if (patientFirstName && patientLastName && patientEmail) {
      try{
        const makeAppointmentHandler = async (username, email) => {
          const dataResponse = await getPatientIdWithUserInfo(username, email);
          const appointmentInfo = {
            doctor: getCookie('roleId'),
            patient: dataResponse.data.patient_id,
            appointment_date: formattedDate,
            reason_for_visit: reasonForVisit,
            status: "Scheduled"
          }
          await makeAppointment(appointmentInfo);
        }
        makeAppointmentHandler(patientUsername, patientEmail);
        alert(`Appointment booked for ${patientEmail} on ${formattedDate}.`);
      } catch(e){
        alert("Error occurred while making appointment: ", e);
        console.error("Error occurred while making appointment: ", e);
      }
    }
  });
});

