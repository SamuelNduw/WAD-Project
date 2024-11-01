// script.js

document.addEventListener("DOMContentLoaded", () => {
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