import express from 'express'
import bodyParser from 'body-parser'
import{register, load, loadedMedications, availableForLoading, batteryLevel, batteryLog} from '../controllers/drone.js'

const dronesRouter = express.Router();
dronesRouter.use(bodyParser.json())

//Drone API
dronesRouter.post('/register', register)
dronesRouter.patch('/load/:droneId', load)
dronesRouter.delete('/loaded-medications/:droneId', loadedMedications)
dronesRouter.get('/drone-available', availableForLoading)
dronesRouter.get('/battery-log', batteryLog)
dronesRouter.get('/battery-level/:droneId', batteryLevel)

export default dronesRouter;