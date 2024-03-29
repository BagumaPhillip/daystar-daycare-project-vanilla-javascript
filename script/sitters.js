document.addEventListener('DOMContentLoaded', () => {
    const sitterForm = document.getElementById('sitterForm');
    const sitterTable = document.getElementById('sitterTable').getElementsByTagName('tbody')[0];
    const deleteButton = document.getElementById('deleteSelected');
    let selectedRow = null;

    // Load sitters from local storage on page load
    loadSitters();

    // Function to load sitters from local storage and populate table
    function loadSitters() {
        const sitters = JSON.parse(localStorage.getItem('sitters')) || [];
        sitters.forEach(sitter => addSitterToTable(sitter));
    }

    // Function to add a sitter to the table and local storage
    function addSitterToTable(sitter) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sitter.name}</td>
            <td>${sitter.location}</td>
            <td>${sitter.dob}</td>
            <td>${sitter.gender}</td>
            <td>${sitter.nextOfKin}</td>
            <td>${sitter.nin}</td>
            <td>${sitter.recommender}</td>
            <td>${sitter.religion}</td>
            <td>${sitter.education}</td>
            <td>${sitter.sitterNumber}</td>
            <td>${sitter.phone1}</td>
            <td>${sitter.phone2}</td>
            <td>${sitter.email}</td>
        `;
        row.addEventListener('click', () => {
            if (selectedRow === row) {
                selectedRow.classList.remove('selected');
                selectedRow = null;
            } else {
                if (selectedRow) selectedRow.classList.remove('selected');
                selectedRow = row;
                selectedRow.classList.add('selected');
            }
        });
        sitterTable.appendChild(row);
    }

    // Function to handle form submission
    sitterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(sitterForm);
        const sitter = Object.fromEntries(formData.entries());
        addSitterToTable(sitter);
        saveSitter(sitter);
        sitterForm.reset();
    });

    // Function to save sitter data to local storage
    function saveSitter(sitter) {
        const sitters = JSON.parse(localStorage.getItem('sitters')) || [];
        sitters.push(sitter);
        localStorage.setItem('sitters', JSON.stringify(sitters));
    }

    // Function to delete the selected row and its data from local storage
    deleteButton.addEventListener('click', () => {
        if (selectedRow) {
            const sitters = JSON.parse(localStorage.getItem('sitters')) || [];
            const index = Array.from(sitterTable.children).indexOf(selectedRow);
            sitters.splice(index, 1);
            localStorage.setItem('sitters', JSON.stringify(sitters));
            sitterTable.removeChild(selectedRow);
            selectedRow = null;
        }
    });
});
