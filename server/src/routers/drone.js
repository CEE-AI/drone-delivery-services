import express from 'express'
import bodyParser from 'body-parser'
import{register, load, loadedMedications, availableForLoading} from '../controllers/drone.js'

const dronesRouter = express.Router();
dronesRouter.use(bodyParser.json())

//Drone API
dronesRouter.post('/register', register)
dronesRouter.post('/load/:droneId', load)
dronesRouter.get('/loaded-medications/:droneId', loadedMedications)
dronesRouter.get('/drone-available', availableForLoading)

export default dronesRouter;