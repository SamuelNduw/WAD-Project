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
                setCookie('roleId', roleId, 7);
                setCookie('userId', dataResponse.data.user_id, 7);
                setCookie('role', role, 7);
            } catch(e){
                console.error("Error during authentication: ", e);
                alert('An error occurred while registering the doctor. Please try again.');
            }
        }
        loginUser();
        alert("Login Successful!");
        window.location.href = "../PatientProfile/index.html"; /*You guys should put the home page here*/
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