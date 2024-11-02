import { login } from '../Services/Services.js';

let userLoginData = {};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (username && password) {
        userLoginData = {
            username: username,
            password: password
        }
        const loginUser = async () => {
            try{
                const dataResponse = await login(userLoginData);
                const role = dataResponse.data.is_patient ? "patient" : "doctor";
                const roleId = dataResponse.data.is_patient ? dataResponse.data.patient_id : dataResponse.data.doctor_id
                
                // Set Cookies
                setCookie('roleId', roleId, 7);
                setCookie('userId', dataResponse.data.user_id, 7);
                setCookie('role', role, 7);
                
                // Check role of user
                if (getCookie('role') === 'doctor'){
                    window.location.href = "../APPOINTMENT SCHEDULING/appointment.html";
                }else {
                    window.location.href = "../PatientProfile/p_portal.html";
                }
            } catch(e){
                console.error("Error during authentication: ", e);
                alert('An error occurred while registering the doctor. Please try again.');
            }
        }
        loginUser();
        alert("Login Successful!");

    } else {
        alert("Invalid email or password. Please try again.");
    }
});

function setCookie(name, value, days){
    let expires = "";
    if(days){
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *60* 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length == 2) return parts.pop().split(';').shift();
    return null;
}