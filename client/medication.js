const API = "http://localhost:8701/"
// Register a drone
document.getElementById('uploadForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const code = document.getElementById('code').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('weight', weight);
    formData.append('code', code);
    formData.append('image', image);

    fetch(API + "meds", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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