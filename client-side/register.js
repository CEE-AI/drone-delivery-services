const API = "http://localhost:8701/"
// Register a drone
document.getElementById('registerDroneForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const serialNumber = document.getElementById('serialNumber').value;
    const model = document.getElementById('model').value;
    const weightLimit = parseFloat(document.getElementById('weightLimit').value);
    const batteryCapacity = parseFloat(document.getElementById('batteryCapacity').value);

    fetch(API+"drones/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serialNumber, model, weightLimit, batteryCapacity })
    })
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            response.json()})
        .then(data => {
            console.log('Response data:', data);
            Swal.fire('Drone registered:', JSON.stringify(data), 'success');
        })
        .catch(error => {
            Swal.fire('Error', 'registering drone:', error.message );
        });
});