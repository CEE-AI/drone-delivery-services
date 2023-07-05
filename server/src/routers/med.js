import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {createMed} from '../controllers/medication.js'

const medsRouter = express.Router()
medsRouter.use(bodyParser.json())
medsRouter.use(bodyParser.urlencoded({extended: false}))
const upload = multer({ dest: './assets/images' });


medsRouter.post('/', createMed)

medsRouter.post('/', upload.single('amaterm'), createMed, function(req,res,next){
    console.error('>>>', req.file)

    console.log(req.file.originalname)
    console.log(req.file.filepath)
    console.log(req.file.mimetype)

    const file = __dirname + '/' + req.file.originalname
    fs.readFile(req.file.filepath, (err, data)=>{
        fs.writeFile(file, data, (err)=>{
            if(err){
                console.log(err)
            }else{
                const response = {
                    message: "file uploaded successfully",
                    filename: req.file.originalname
                }
                console.log(response)
                res.json(response)
            }
        })
    })
})

export default medsRouter
