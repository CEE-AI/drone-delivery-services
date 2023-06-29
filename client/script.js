"use strict";

const API = `http://localhost:8701/`;
// Load medication items
document.getElementById('loadMedicationsForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const droneId = document.getElementById('droneId').value;
    const medIds = document.getElementById('medIds').value.split(',');

    fetch(`${API}drones/load/${droneId}`, {
        method: 'PATCH',
        headers: new Headers ({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ medIds })
    })
        
    .then(response => {
        console.log('Response status:', response.status);

        return response.json(); 
    })
    .then(data => {
        Swal.fire('Medications loaded:', JSON.stringify(data), 'success');
    })
    .catch(error => {
        Swal.fire('Error', error.message, 'error');
    });

});

// Get loaded medications for a drone
const droneId = document.getElementById('serialNumber').value;
const getLoadedMedications = (droneId) => {
    fetch(`${API}drones/loaded-medications/${droneId}`)
        .then(response => response.json())
        .then(data => {
            const loadedMedicationsElement = document.getElementById('loadedMedications');
            loadedMedicationsElement.innerHTML = '';

            if (data.length === 0) {
                loadedMedicationsElement.textContent = 'No medications loaded.';
                return;
            }

            data.forEach(med => {
                const medItem = document.createElement('div');
                medItem.textContent = `Name: ${med.name}, Weight: ${med.weight}, Code: ${med.code}`;
                loadedMedicationsElement.appendChild(medItem);
            });
        })
        .catch(error => {
            console.error('Error getting loaded medications:', error);
        });
};

// Get available drones for loading
const getAvailableDrones = () => {
    fetch(API +'drones/drone-available')
        .then(response => response.json())
        .then(data => {
            const availableDronesElement = document.getElementById('availableDrones');
            availableDronesElement.innerHTML = '';

            if (data.length === 0) {
                availableDronesElement.textContent = 'No drones available for loading.';
                return;
            }

            data.forEach(drone => {
                const droneItem = document.createElement('div');
                droneItem.textContent = `${drone.model} ${ drone.serialNumber } `;
                availableDronesElement.appendChild(droneItem);
            });
        })
        .catch(error => {
            console.error('Error getting available drones:', error);
        });
};

// Get battery level for a drone
document.getElementById('batteryLevelForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const droneId = document.getElementById('droneIdForBattery').value;

    fetch(`${API}drones/battery-level/${droneId}`)
        .then(response => response.json())
        .then(data => {
            Swal.fire(`Battery level: ${data}%`, 'success');
        })
        .catch(error => {
            Swal.fire('Error getting battery level:', error, 'error');
        });
});




// Example usage
getLoadedMedications();
getAvailableDrones();
getLoadedMedications(`${droneId}`)