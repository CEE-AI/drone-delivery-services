import express from 'express';
import dronesRouter from './drone.js';
import medsRouter from './med.js';


const router = express.Router()

//Routers
export default () => {
    router.use('/drones', dronesRouter);
    router.use('/meds', medsRouter)
    return router;
}