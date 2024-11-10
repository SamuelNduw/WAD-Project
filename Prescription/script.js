import { makePrescription, getPatientIdWithUserInfo } from "../Services/Services.js";

function getCookie(name){
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`)
  if (parts.length == 2) return parts.pop().split(';').shift();
  return null;
}

document.getElementById('prescriptionForm').addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const username = firstName + lastName;
    const email = document.getElementById("email").value.trim();
    const medicationName = document.getElementById("medication").value.trim();
    const dosage = document.getElementById("dosage").value.trim();
    const instructions = document.getElementById("instructions").value.trim();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    if (firstName && lastName && email && medicationName && dosage && instructions) {
        const makePrescriptionHandler = async (username, email) => {
            try {
                const dataResponse = await getPatientIdWithUserInfo(username, email);
                const prescriptionInfo = {
                    doctor: getCookie('roleId'),
                    patient: dataResponse.data.patient_id,
                    medication_name: medicationName,
                    dosage: dosage,
                    instructions: instructions,
                    date_issued: formattedDate
                };
                await makePrescription(prescriptionInfo);
            } catch (e) {
                alert("Error occurred while making prescription.");
                console.error("Error occurred while making prescription:", e);
            }
        };
    
        makePrescriptionHandler(username, email);
        alert("Prescription successfully made.")
    } else {
        alert("Please fill in all fields");
    }
    
});