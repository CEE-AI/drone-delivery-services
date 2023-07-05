const API = "http://localhost:8701/"
// Register a drone
document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const code = document.getElementById('code').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0];


    fetch(API + "meds", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, weight, code, image})
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log('Response data:', data);
            Swal.fire('Medication registered:', JSON.stringify(data), 'success');
        })
        .catch(error => {
            Swal.fire('Error registering medication:', error.message, 'error');
        });
});