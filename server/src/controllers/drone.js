import fs from 'fs';
import {dirname} from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import medDB from './medication.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, '..', 'data', 'drones.js')

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
        if (!serialNumber||!model||!weightLimit||!batteryCapacity){
            return res.status(400).send({message: 'Please fill all fields', error})
        }
        const drone = {
            serialNumber,
            model,
            weightLimit,
            batteryCapacity,
            state: 'IDLE',
            loadMedications: []
        };

        const existingDrone = await droneDB.find((d) => d.serialNumber === serialNumber)
        if(existingDrone){
            return res.status(400).send({message: "Drone already registered"})
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
        const drone = await droneDB.find((d) => d.serialNumber === serialNumber)
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

        //Load the medication items onto the drone
        drone.loadedMedications = medIds.map((medId) => {
            const med = medDB.find((med) => med.code === medId)
            return med ? med : null
        })

        //update the drone state
        drone.state = 'LOADED';
        saveDataToFile(droneDB, 'drone.json');

        res.status(200).json({ message: 'Drone loaded', drone })

    }catch(error){

    }
};

//