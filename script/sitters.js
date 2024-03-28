document.addEventListener('DOMContentLoaded', function () {
    const sitterForm = document.getElementById('sitterForm');
    const sitterTable = document.querySelector('#sitterTable tbody');

    sitterForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const sitterData = {
            name: sitterForm.elements['name'].value,
            location: sitterForm.elements['location'].value,
            dob: sitterForm.elements['dob'].value
        };
        addSitter(sitterData);
    });

    // Fetch sitters data from local storage when the page loads
    renderSittersFromLocalStorage();

    function renderSittersFromLocalStorage() {
        const sitters = JSON.parse(localStorage.getItem('sitters')) || [];
        populateSitterTable(sitters);
    }

    function populateSitterTable(sitters) {
        sitterTable.innerHTML = ''; // Clear existing table rows
        sitters.forEach(sitter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sitter.name}</td>
                <td>${sitter.location}</td>
                <td>${sitter.dob}</td>
            `;
            sitterTable.appendChild(row);
        });
    }

    function addSitter(sitterData) {
        const sitters = JSON.parse(localStorage.getItem('sitters')) || [];
        sitters.push(sitterData);
        localStorage.setItem('sitters', JSON.stringify(sitters));
        renderSittersFromLocalStorage(); // Update table with new data
        sitterForm.reset(); // Clear the form fields
    }
});
