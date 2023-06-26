import express from 'express';
import dronesRouter from './drone.js';


const router = express.Router()

//Routers
export default () => {
    router.use('/drones', dronesRouter);
    return router;
}