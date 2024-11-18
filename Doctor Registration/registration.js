import  {userRegistration, doctorRegistration, patientRegistration}  from "../Services/Services.js";

let userRegData = {};

// Doctor Registration Logic
document.getElementById("doctorRegistrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect field values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const licenseNumber = document.getElementById("licenseNumber").value;
    const password = document.getElementById("password").value;
    const username = firstName + lastName;
    
    // Validation for all fields
    if (firstName && lastName && email && phone && specialization && licenseNumber && password) {
        userRegData = {
            username: username,
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            is_patient: false,
            is_doctor: true
        }
        
        const doctorRegistrationHandler = async () => {
            try{
                const dataResponse = await userRegistration(userRegData);

                const doctorData = {
                    user: dataResponse.data.id,
                    specialization: specialization,
                    license_number: licenseNumber,
                    contact_number: phone 
                }
                const dataResponse2 = await doctorRegistration(doctorData);
                setCookie('roleId', dataResponse2.data.id, 7);
                setCookie('userId', dataResponse2.data.user, 7);
                setCookie('role', "doctor", 7);
                alert("Doctor Registration Successful");
                console.log(dataResponse, dataResponse2, "successful")
            } catch(e) {
                console.error("Error during doctor registration: ", e);
                alert('An error occurred while registering the doctor. Please try again.')
            }
        }
        doctorRegistrationHandler();
    } else {
        alert("Please fill in all fields");
    }
});

// Patient Registration Logic
document.getElementById("patientRegistrationForm").addEventListener("submit", function(event){
    event.preventDefault();
    console.log("button patient pressed")
    const firstNamePatient = document.getElementById("firstNamePatient").value.trim();
    const lastNamePatient = document.getElementById("lastNamePatient").value.trim();
    const emailPatient = document.getElementById("emailPatient").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const address = document.getElementById("address").value.trim();
    const phonePatient = document.getElementById("phonePatient").value.trim();
    const medicalHistory = document.getElementById("medicalHistory").value.trim();
    const password = document.getElementById("passwordPatient").value;
    const username = firstNamePatient + lastNamePatient;

    console.log(firstNamePatient)
    
    if (firstNamePatient && lastNamePatient && emailPatient && dob && address && phonePatient && medicalHistory && password){
        userRegData =  {
            username: username,
            email: emailPatient,
            password: password,
            first_name: firstNamePatient,
            last_name: lastNamePatient,
            is_patient: true,
            is_doctor: false
        }
        console.log("User data for registration: ", userRegData)
        const patientRegistrationHandler = async () => {
            try{
                const dataResponse = await userRegistration(userRegData);
                console.log("User registration response: ", dataResponse.data.id);
                const patientData = {
                    user: dataResponse.data.id,
                    date_of_birth: dob,
                    address: address,
                    phone_number: phonePatient,
                    medical_history: medicalHistory
                }
                const dataResponse2 = await patientRegistration(patientData);
                setCookie('roleId', dataResponse2.data.id, 7);
                setCookie('userId', dataResponse2.data.user, 7);
                setCookie('role', "patient", 7)
                alert("Patient Registration Successful");
            } catch(e){
                console.error("Error during patient registration: ", e);
                alert('An error occurred while registering the patient. Please try again.')
            }
        }
        patientRegistrationHandler();
    } else{
        alert("Please fill in all fields");
    }
});

document.getElementById("loginButton").addEventListener('click', function(event){
    window.location.href = "../Login/Login.html";
})

function setCookie(name, value, days){
    let expires = "";
    if(days){
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *60* 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}