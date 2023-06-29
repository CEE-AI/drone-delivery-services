const API = 'http://localhost:8701/'

const batteryLogTable = document.getElementById("batteryLogTable").getElementsByTagName('tbody')[0];

// Function to fetch battery log data from the server
const fetchBatteryLog = async () => {
    try {
        const response = await fetch(API + 'drones/battery-log');
        const data = await response.json();

        // Clear the existing table rows
        batteryLogTable.innerHTML = '';

        // Populate the table with battery log data
        data.forEach(log => {
            const row = document.createElement('tr');
            const droneIdCell = document.createElement('td');
            droneIdCell.textContent = log.serialNumber;
            const modelCell = document.createElement('td');
            modelCell.textContent = log.model;
            const batteryLevelCell = document.createElement('td');
            batteryLevelCell.textContent = log.batteryCapacity;

            row.appendChild(droneIdCell);
            row.appendChild(modelCell);
            row.appendChild(batteryLevelCell);
            batteryLogTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching battery log:', error);
    }
};

// Fetch the battery log initially
fetchBatteryLog();

// Set up an interval to fetch the battery log periodically
setInterval(fetchBatteryLog, 60000); // Fetch every 1 minute