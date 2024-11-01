// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Capture form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form fields
    if (name && email && subject && message) {
        // Display a success message
        document.getElementById('form-response').textContent = `Thank you, ${name}! Your message has been successfully sent. We'll respond to your email at ${email} shortly.`;

        // Clear the form fields
        document.getElementById('contact-form').reset();
    } else {
        // Display an error message if fields are missing
        document.getElementById('form-response').textContent = 'Please fill out all fields before submitting.';
    }
});
