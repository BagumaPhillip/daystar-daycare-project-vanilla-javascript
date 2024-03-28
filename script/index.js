// index.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Example of hardcoded admin and sitter credentials
    var adminCredentials = { username: 'admin', password: 'admin123' };
    var sitterCredentials = { username: 'sitter', password: 'sitter123' };

    // Check if the entered credentials match either admin or sitter
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // Redirect to admin page (assuming admin.html exists)
        window.location.href = '../pages/dashboard.html';
    } else if (username === sitterCredentials.username && password === sitterCredentials.password) {
        // Redirect to sitter page (assuming sitter.html exists)
        window.location.href = '../pages/sitter-babyassignment.html';
    } else {
        // Display an error message for invalid credentials
        alert('Invalid username or password');
    }
});
