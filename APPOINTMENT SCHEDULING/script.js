// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector("[data-resize-btn]");
  const body = document.body;

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.toggle("sb-expanded");
  });

  // // Set active class based on current URL
  // const sidebarLinks = document.querySelectorAll("aside nav a");
  // const currentPage = window.location.href;

  // sidebarLinks.forEach((link) => {
  //   if (link.href === currentPage) {
  //     link.classList.add("active");
  //   } else {
  //     link.classList.remove("active"); // Remove from other links
  //   }
  // });


  // Event listener for booking buttons
  document.querySelectorAll(".book-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Prompt user for information
      const firstName = prompt("Enter your First Name:");
      const lastName = prompt("Enter your Last Name:");
      const email = prompt("Enter your Email:");

      // Ensure user has entered all required information
      if (!firstName || !lastName || !email) {
        alert("All fields are required. Please fill in all details to proceed with booking.");
        return;
      }

      // Check if the time slot is available
      const isBooked = Math.random() < 0.5; // Randomly simulate slot availability
      if (isBooked) {
        const bookingTime = button.parentElement.textContent.trim();
        alert(
          `Booking successful!\nPatient: ${firstName} ${lastName}\nEmail: ${email}\nYour appointment is scheduled for ${bookingTime}.`
        );
      } else {
        alert("This time slot is unavailable. Please select a different time.");
      }
    });
  });
});
