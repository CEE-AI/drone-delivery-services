import express from 'express'
import bodyParser from 'body-parser'
import {createMed} from '../controllers/medication.js'

const medsRouter = express.Router()
medsRouter.use(bodyParser.json())

medsRouter.post('/', createMed)

export default medsRouter
