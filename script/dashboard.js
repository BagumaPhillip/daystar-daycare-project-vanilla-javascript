// Function to populate the sitter table
function populateSitterTable() {
    const sitterTableBody = document.getElementById('sitterTableBody');
    sitterTableBody.innerHTML = '';

    const sitterData = [
        { number: 1, name: 'Sitter 1', phone: '1234567890', available: true },
        { number: 2, name: 'Sitter 2', phone: '0987654321', available: false }
    ];

    sitterData.forEach(sitter => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sitter.number}</td>
            <td>${sitter.name}</td>
            <td>${sitter.phone}</td>
            <td>${sitter.available ? '<i class="fas fa-check green"></i>' : '<i class="fas fa-times red"></i>'}</td>
        `;
        sitterTableBody.appendChild(row);
    });
}

// Function to populate accounts table
function populateAccountsTable() {
    const accountsTableBody = document.getElementById('accountsTableBody');
    accountsTableBody.innerHTML = '';

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.forEach(account => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.accountName}</td>
            <td>${account.accountPassword}</td>
        `;
        accountsTableBody.appendChild(row);
    });
}

function showSection(section) {
    const content = document.getElementById('content');
    switch (section) {
        case 'babies':
            content.innerHTML = `<h2>Babies Section</h2>
                                <h3>Arrivals</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Baby name</th>
                                            <th>Time of Arrival</th>
                                            <th>Period of Stay</th>
                                            <th>Person bringing the Baby</th> 
                                            <th>Amount Paid (UGX)</th>
                                        </tr>
                                    </thead>
                                    <tbody id="arrivalsTableBody">
                                        <!-- Data will be populated dynamically -->
                                    </tbody>
                                </table>
                                <h3>Departures</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Baby Name</th>
                                            <th>Time of Departure</th>
                                            <th>Person taking the Baby</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Data will be populated dynamically -->
                                    </tbody>
                                </table>`;
            break;
        case 'sitters':
            content.innerHTML = `<h2>Sitters Section</h2>
                                <h3>Sitter Table</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Number</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Available</th>
                                        </tr>
                                    </thead>
                                    <tbody id="sitterTableBody">
                                        <!-- Data will be populated dynamically -->
                                    </tbody>
                                </table>`;
            populateSitterTable(); // Populate sitter table
            break;
        case 'assign-accounts':
            content.innerHTML = `<h2>Assign Accounts Section</h2>
                                <h3>Create Accounts</h3>
                                <form id="createAccountForm">
                                    <label for="accountName">Name:</label>
                                    <input type="text" id="accountName" name="accountName" required>
                                    <label for="accountPassword">Password:</label>
                                    <input type="password" id="accountPassword" name="accountPassword" required>
                                    <button type="submit">Create Account</button>
                                </form>
                                <h3>Accounts Table</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Password</th>
                                        </tr>
                                    </thead>
                                    <tbody id="accountsTableBody">
                                        <!-- Accounts will be populated dynamically -->
                                    </tbody>
                                </table>`;
            populateAccountsTable(); // Populate accounts table
            break;
    }
}

// Handle form submission for creating accounts
const createAccountForm = document.getElementById('createAccountForm');
createAccountForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(createAccountForm);
    const accountData = {};
    formData.forEach((value, key) => {
        accountData[key] = value;
    });

    // Save data to localStorage
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push(accountData);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Update accounts table
    populateAccountsTable();

    // Clear form
    createAccountForm.reset();
});

// Initial population of sitter table and accounts table
populateSitterTable();
populateAccountsTable();
