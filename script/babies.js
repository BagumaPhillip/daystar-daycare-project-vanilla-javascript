document.addEventListener("DOMContentLoaded", function() {
    // Load data from localStorage on page load
    loadDataFromLocalStorage();

    // Add submit event listener to the form
    document.getElementById("babyForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get form values
        var name = document.getElementById("name").value;
        var gender = document.getElementById("gender").value;
        var age = document.getElementById("age").value;
        var location = document.getElementById("location").value;
        var parent1 = document.getElementById("parent1").value;
        var parent2 = document.getElementById("parent2").value;
        var babyId = document.getElementById("babyId").value;

        // Create a new object to hold the form data
        var babyData = {
            name: name,
            gender: gender,
            age: age,
            location: location,
            parent1: parent1,
            parent2: parent2,
            babyId: babyId
        };

        // Add the new data to the table
        addDataToTable(babyData);

        // Save the data to localStorage
        saveDataToLocalStorage(babyData);

        // Clear the form fields
        clearForm();
    });

    // Function to load data from localStorage
    function loadDataFromLocalStorage() {
        var babyDataArray = JSON.parse(localStorage.getItem("babyData")) || [];
        babyDataArray.forEach(function(babyData) {
            addDataToTable(babyData);
        });
    }

    // Function to save data to localStorage
    function saveDataToLocalStorage(babyData) {
        var babyDataArray = JSON.parse(localStorage.getItem("babyData")) || [];
        babyDataArray.push(babyData);
        localStorage.setItem("babyData", JSON.stringify(babyDataArray));
    }

    // Function to add data to the table
    function addDataToTable(babyData) {
        var tableBody = document.getElementById("babyTableBody");
        var row = tableBody.insertRow();
        row.insertCell().textContent = babyData.name;
        row.insertCell().textContent = babyData.gender;
        row.insertCell().textContent = babyData.age;
        row.insertCell().textContent = babyData.location;
        row.insertCell().textContent = babyData.parent1;
        row.insertCell().textContent = babyData.parent2;
        row.insertCell().textContent = babyData.babyId;
    }

    // Function to clear the form fields
    function clearForm() {
        document.getElementById("babyForm").reset();
    }
});
