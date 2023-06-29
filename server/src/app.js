import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import router from './routers/app.js'
import dronesRouter from './routers/drone.js'
dotenv.config()

const app = express();
const port = process.env.PORT

//middleware
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



// router
app.use('/', router())
app.use('/drones', dronesRouter)

// start server
app.listen(port, () => console.log(`server currently running on port ${port}`))

// check server
app.get('/', (req, res) => res.send(`Drone Service is Live`))