document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect field values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const licenseNumber = document.getElementById("licenseNumber").value.trim();
    const clinicAffiliation = document.getElementById("clinicAffiliation").value.trim();

    // Get checked languages from dropdown
    const languages = Array.from(document.querySelectorAll('.dropdown-menu input[type="checkbox"]:checked'))
                           .map(checkbox => checkbox.value);

    const declaration = document.getElementById("declaration").checked;

    // Validation for all fields
    if (firstName && lastName && email && phone && country && city &&
        specialization && licenseNumber && clinicAffiliation &&
        languages.length > 0 && declaration) {
        document.getElementById("message").textContent = "Registration successful!";
        document.getElementById("message").style.color = "#28a745";
    } else {
        document.getElementById("message").textContent = "Please fill in all fields.";
        document.getElementById("message").style.color = "red";
    }
});

// Dropdown toggle functionality
document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    // Toggle dropdown menu visibility
    dropdownToggle.addEventListener("click", function() {
        dropdownMenu.parentElement.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.parentElement.classList.remove("open");
        }
    });
});
