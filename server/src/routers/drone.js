import express from 'express'
import bodyParser from 'body-parser'

const dronesRouter = express.Router();
dronesRouter.use(bodyParser.json())

//Drone API


export default dronesRouter;