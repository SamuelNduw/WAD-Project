// script.js

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