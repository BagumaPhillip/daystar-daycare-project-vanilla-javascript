// Function to handle form submission for arrivals
const arrivalForm = document.getElementById('arrivalForm');
arrivalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(arrivalForm);
    const arrivalData = {};
    formData.forEach((value, key) => {
        arrivalData[key] = value;
    });

    // Save data to localStorage or send it to the server, depending on your setup
    // For demonstration, I'll use localStorage
    let arrivals = JSON.parse(localStorage.getItem('arrivals')) || [];
    arrivals.push(arrivalData);
    localStorage.setItem('arrivals', JSON.stringify(arrivals));

    // Optionally, you can clear the form after submission
    arrivalForm.reset();

    // Update the arrivals table in the dashboard
    updateArrivalsTable(arrivals);
});

// Function to update the arrivals table in the dashboard
function updateArrivalsTable(arrivals) {
    const arrivalsTableBody = document.getElementById('arrivalsTableBody');
    arrivalsTableBody.innerHTML = '';

    arrivals.forEach(arrival => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${arrival.babyName}</td>
            <td>${arrival.arrivalTime}</td>
            <td>${arrival.periodOfStay}</td>
            <td>${arrival.personBringing}</td>
            <td>${arrival.amountPaid}</td>
        `;
        arrivalsTableBody.appendChild(row);
    });
}

// Function to populate the arrivals table on initial load
function populateArrivalsTable() {
    const arrivals = JSON.parse(localStorage.getItem('arrivals')) || [];
    updateArrivalsTable(arrivals);
}

// Call the populateArrivalsTable function on initial load
populateArrivalsTable();
