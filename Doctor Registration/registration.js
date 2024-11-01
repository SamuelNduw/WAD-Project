import { userRegistration, doctorRegistration, patientRegistration } from "../Services/Services";

const userRegData = {};
// Doctor Registration Logic
document.getElementById("doctorRegistrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect field values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const licenseNumber = document.getElementById("licenseNumber").value.trim();
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
        
        async () => {
            try{
                dataResponse = await userRegistration(userRegData);

                const doctorData = {
                    user: dataResponse.id,
                    specialization: specialization,
                    license_number: licenseNumber,
                    contact_number: phone 
                }
                dataResponse2 = await doctorRegistration(doctorData);
                setCookie('roleId', dataResponse2.id, 7);
                setCookie('userId', dataResponse2.user, 7);
                setCookie('role', "doctor", 7);
                alert("Doctor Registration Successful");
            } catch(e) {
                alert('An error occurred while registering the doctor. Please try again.')
            }
        }
    } else {
        alert("Please fill in all fields");
    }
});

document.getElementById("patientRegistrationForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    const firstNamePatient = document.getElementById("firstNamePatient").value.trim();
    const lastNamePatient = document.getElementById("lastNamePatient").value.trim();
    const emailPatient = document.getElementById("emailPatient").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const address = document.getElementById("address").value.trim();
    const phonePatient = document.getElementById("phonePatient").value.trim();
    const medicalHistory = document.getElementById("medicalHistory").value.trim();
    const password = document.getElementById("passwordPatient").value;
    const username = firstNamePatient + lastNamePatient;
    
    if (firstNamePatient && lastNamePatient && emailPatient && dob && address && phonePatient && medicalHistory && password){
        userRegData =  {
            username: username,
            email: emailPatient,
            password: password,
            first_name: firstNamePatient,
            last_name: lastNamePatient,
            is_patient: false,
            is_doctor: true
        }

        async () => {
            try{
                dataResponse = await userRegistration(userRegData);

                const patientData = {
                    user: dataResponse.id,
                    date_of_birth: dob,
                    address: address,
                    phone_number: phonePatient,
                    medical_history: medicalHistory
                }
                dataResponse2 = await patientRegistration(patientData);
                setCookie('roleId', dataResponse2.id, 7);
                setCookie('userId', dataResponse2.user, 7);
                setCookie('role', "patient", 7)
                alert("Patient Registration Successful");
            } catch(e){
                alert('An error occurred while registering the doctor. Please try again.')
            }
        }
    } else{
        alert("Please fill in all fields");
    }
});

// Dropdown toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Toggle dropdown menu visibility
    dropdownToggle.addEventListener("click", function () {
        dropdownMenu.parentElement.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.parentElement.classList.remove("open");
        }
    });


    const toggleButton = document.querySelector("[data-resize-btn]");
    const body = document.body;

    toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        body.classList.toggle("sb-expanded");
    });
});

function showForm(formType){
    const doctorForm = document.getElementById('doctorForm');
    const patientForm = document.getElementById('patientForm');

    if (formType === 'doctor'){
        doctorForm.style.display = 'block';
        patientForm.style.display = 'none';
    } else {
        doctorForm.style.display = 'none';
        patientForm.style.display = 'block'
    }
}

function setCookie(name, value, days){
    let expires = "";
    if(days){
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *60* 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}