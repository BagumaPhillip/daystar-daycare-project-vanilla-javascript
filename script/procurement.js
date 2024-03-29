// Function to calculate cost for each row and update total cost
function calculateCost() {
    let totalCost = 0;
    const rows = document.querySelectorAll("#procurementTable tbody tr");
    rows.forEach(row => {
        const quantity = parseFloat(row.cells[1].innerText);
        const unitPrice = parseFloat(row.cells[2].innerText);
        const cost = quantity * unitPrice;
        row.cells[3].innerText = cost.toFixed(2);
        totalCost += cost;
    });
    document.getElementById("totalCost").innerText = totalCost.toFixed(2);

    // Save table data to localStorage
    saveTableData();
}

// Function to add a new row
function addRow() {
    const tbody = document.querySelector("#procurementTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td contenteditable="true">New Item</td>
        <td contenteditable="true">1</td>
        <td contenteditable="true">0</td>
        <td></td>
    `;
    tbody.appendChild(newRow);
    attachCellListeners(newRow); // Attach event listeners to new row cells
    calculateCost();
}

// Function to delete the last added row
function deleteRow() {
    const tbody = document.querySelector("#procurementTable tbody");
    const rows = tbody.querySelectorAll("tr");
    if (rows.length > 1) {
        tbody.removeChild(rows[rows.length - 1]);
        calculateCost();
    }
}

// Function to save table data to localStorage
function saveTableData() {
    const tableData = [];
    const rows = document.querySelectorAll("#procurementTable tbody tr");
    rows.forEach(row => {
        const rowData = {
            item: row.cells[0].innerText,
            quantity: row.cells[1].innerText,
            unitPrice: row.cells[2].innerText,
            cost: row.cells[3].innerText
        };
        tableData.push(rowData);
    });
    localStorage.setItem('procurementTableData', JSON.stringify(tableData));
}

// Function to load table data from localStorage
function loadTableData() {
    const storedData = localStorage.getItem('procurementTableData');
    if (storedData) {
        const tableData = JSON.parse(storedData);
        const tbody = document.querySelector("#procurementTable tbody");
        tbody.innerHTML = ""; // Clear existing rows
        tableData.forEach(rowData => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td contenteditable="true">${rowData.item}</td>
                <td contenteditable="true">${rowData.quantity}</td>
                <td contenteditable="true">${rowData.unitPrice}</td>
                <td>${rowData.cost}</td>
            `;
            tbody.appendChild(newRow);
        });
        attachCellListeners(tbody); // Attach event listeners to loaded row cells
        calculateCost(); // Recalculate cost
    }
}

// Function to attach event listeners to cell inputs
function attachCellListeners(parentElement) {
    parentElement.querySelectorAll("td[contenteditable='true']").forEach(cell => {
        cell.addEventListener("input", calculateCost);
    });
}

// Attach event listener for adding a row
document.getElementById("addRow").addEventListener("click", addRow);

// Attach event listener for deleting a row
document.getElementById("deleteRow").addEventListener("click", deleteRow);

// Load table data when the page loads
window.onload = function() {
    loadTableData();
};
