document.addEventListener('DOMContentLoaded', function() {
    const babyForm = document.getElementById('babyForm');

    babyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get form data
        const formData = new FormData(babyForm);
        const babyData = {};
        formData.forEach((value, key) => {
            babyData[key] = value;
        });

        // Save data to localStorage
        let babies = JSON.parse(localStorage.getItem('babies')) || [];
        babies.push(babyData);
        localStorage.setItem('babies', JSON.stringify(babies));

        // Clear form
        babyForm.reset();

        // Alert the user
        alert('Baby details have been successfully saved!');
    });
});
