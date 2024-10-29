document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".complete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const appointment = button.closest(".appointment");
        appointment.querySelector("p").textContent += " - Completed";
        button.disabled = true; // Disable the button after marking as completed
      });
    });
  
    document.querySelectorAll(".cancel-btn").forEach(button => {
      button.addEventListener("click", () => {
        const appointment = button.closest(".appointment");
        appointment.remove(); // Remove the appointment from the DOM
        alert("Appointment canceled successfully.");
      });
    });
  });
  