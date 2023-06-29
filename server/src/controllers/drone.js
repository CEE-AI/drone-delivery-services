import fs from 'fs';
import {dirname} from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import medDB from './medication.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, '..', 'data', 'drones.json')

// Load drone data from drones.json when server starts
const loadDataFromFile = () =>{
    try{
        const data = fs.readFileSync(dataFilePath, 'utf8')
        return JSON.parse(data)
    }catch(error){
        console.log('Error loading data from file:', error)
        return [];
    }
}

// Function to save the drone data to drones.json
const saveDataToFile = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

// Initialize droneDB array with data from drones.js
const droneDB = loadDataFromFile();

// Register drone
export const register = async (req, res) => {
    try{
        const{ serialNumber, model, weightLimit, batteryCapacity} = req.body
        if (!serialNumber||!weightLimit||!batteryCapacity){
            return res.status(400).send({message: 'Please fill all fields', error})
        }
        const drone = {
            serialNumber,
            model,
            weightLimit,
            batteryCapacity,
            state: 'LOADING',
            loadMedications: []
        };

        const existingDrone = await droneDB.find((d) => d.serialNumber === serialNumber)
        if(existingDrone){
            return res.status(400).send({message: "Drone already registered"})
        }
        
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(serialNumber)) {
            return res.status(400).json({ error: 'Input should only contain alphanumeric characters.' });
        }

        // Check if input length exceeds 100 characters
        if (serialNumber.length > 100) {
            return res.status(400).json({ error: 'Input should be a maximum of 100 characters.' });
        }

        droneDB.push(drone)
        saveDataToFile(droneDB)
        res.status(201).send({message: 'Drone successfully registered', drone})

    }catch(error){
        res.status(500).send({success: false, msg: "error registering drone"})
    }
};

//Load drone with medications
export const load = async (req, res) => {
    try{
        const {droneId} = req.params
        const {medIds} = req.body

        //Find drone serial number
        const drone = await droneDB.find((d) => d.serialNumber === droneId)
        if(!drone){
            return res.status(404).json({message: 'Drone not found!'})
        }

        //checking the loaded weight of medication items
        const totalWeight = medIds.reduce((acc, medId) => {
            const med = medDB.find((med) => med.code === medId)
            if(med) {
                acc += med.weight;
            }
            return acc;
        }, 0);

        //check if the drone can carry the weight of medication
        if(totalWeight > drone.weightLimit) {
            return res.status(400).json({error: `Exceeded weight limit by ${totalWeight-drone.weightLimit}gr`})
        } 
        else if (drone.batteryCapacity < 25) {
            drone.state = 'IDLE';
            saveDataToFile(droneDB, 'drones.json')
            return res.status(404).json({ error: `Battery is too low: below ${25}%, please recharge` })
        }

        //Load the medication items onto the drone
        drone.loadMedications = medIds.map((medId) => {
            const med = medDB.find((med) => med.code === medId)
            return med ? med : null
        })

        //update the drone state
        drone.state = 'LOADED';
        saveDataToFile(droneDB, 'drones.json');

        res.status(200).json({ message: 'Drone loaded', drone })

    }catch(error){

    }
};

//Retrieve the loaded medication items from a given drone
export const loadedMedications = (req, res) =>{
    try{
        const { droneId } = req.params;

        //Find the drone by serial number
        const drone = droneDB.find((d) => d.serialNumber === droneId)
        if(!drone){
            return res.status(404).send({ error: "Drone not found!"})
        }

        //check if the drone has loaded medications
        if(!drone.loadMedications || drone.loadMedications.length===0){
            return res.status(200).send({message: `No loaded medications for drone ${drone.serialNumber}`})
        }

        //check if the drone is in delivering state
        if(drone.state==='DELIVERING') {
            
            delete drone.loadMedications;
            drone.state = 'DELIVERED';
            saveDataToFile(droneDB, 'drones.json')
        }

        res.send(drone)
    }catch(error){
        return res.status(500).send({message: "server error"})
    }  
}

//Retrieve the available drones for loading
export const availableForLoading = (req, res) => {
    const availableDrones = droneDB.filter(drone => drone.state === 'LOADING')
    if(!availableDrones) {
        res.status(400).send({message: "drones unavailable for loading"})
    }
    res.status(200).json(availableDrones);
};

//Retrieve battery for a given drone
export const batteryLevel = (req, res) => {
    const { droneId } = req.params;
    //find drone by serial number
    const drone = droneDB.find((drone) => drone.serialNumber === droneId)

    if(!drone) {
        return res.status(404).send({ error: 'Drone not found!' })
    }

    if (drone.state === 'DELIVERED' && drone.loadMedications === undefined) {
        drone.loadMedications = []
        saveDataToFile(droneDB, 'drones.json')
    }
    
    if (drone.batteryCapacity < 25) {
        drone.state = 'IDLE';
        saveDataToFile(droneDB, 'drones.json')
    }else if(drone.batteryCapacity > 25 && drone.loadMedications.length!==0){
        drone.state = 'DELIVERING'
        saveDataToFile(droneDB, 'drones.json')
    } else{
        drone.state = 'LOADING';
        saveDataToFile(droneDB, 'drones.json')
    }

    res.json({ batteryLevel: drone.batteryCapacity })
}

export const batteryLog = (req, res) => {
    try {

        const batteryLog = droneDB.map((drone) => {
            return {
                serialNumber: drone.serialNumber,
                model: drone.model,
                batteryCapacity: drone.batteryCapacity,
            };
        });

        res.json(batteryLog);
    } catch (error) {
        console.error('Error fetching battery log:', error);
        res.status(500).json({ error: 'Failed to fetch battery log' });
    }
};

