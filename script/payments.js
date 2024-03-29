// Function to add a new row to the table
function addRow() {
    var table = document.getElementById("sitterpay").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    // Make cells editable
    cell1.contentEditable = true;
    cell2.contentEditable = true;
    cell3.contentEditable = true;

    // Save table data to localStorage
    saveTableData();
}

// Function to delete the last row from the table
function deleteLastRow() {
    var table = document.getElementById("sitterpay").getElementsByTagName('tbody')[0];
    if (table.rows.length > 0) {
        table.deleteRow(-1);
        
        // Save table data to localStorage after deletion
        saveTableData();
    }
}

// Function to save table data to localStorage
function saveTableData() {
    var tableData = [];
    var tableRows = document.getElementById("sitterpay").getElementsByTagName('tbody')[0].rows;

    // Iterate through table rows and save data
    for (var i = 0; i < tableRows.length; i++) {
        var cells = tableRows[i].cells;
        tableData.push({
            sitterNumber: cells[0].textContent.trim(),
            sitterName: cells[1].textContent.trim(),
            payment: cells[2].textContent.trim()
        });
    }

    // Save data to localStorage
    localStorage.setItem('sitterPayData', JSON.stringify(tableData));
}

// Function to load table data from localStorage
function loadTableData() {
    var storedData = localStorage.getItem('sitterPayData');
    if (storedData) {
        var tableData = JSON.parse(storedData);
        var table = document.getElementById("sitterpay").getElementsByTagName('tbody')[0];

        // Iterate through stored data and populate the table
        tableData.forEach(function(rowData) {
            var newRow = table.insertRow();
            newRow.insertCell(0).textContent = rowData.sitterNumber;
            newRow.insertCell(1).textContent = rowData.sitterName;
            newRow.insertCell(2).textContent = rowData.payment;
        });
    }
}

// Load table data when the page loads
window.onload = function() {
    loadTableData();
};
