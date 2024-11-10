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

const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', function(){
    links.forEach(link => link.classList.remove('active'));

    this.classList.add('active');
  })
})