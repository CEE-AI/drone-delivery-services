import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, '..', 'data', 'meds.json')

const loadDataFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8')
        return JSON.parse(data)
    }
    catch (error) {
        console.log('Error loading data from file:', error)
        return []
    }
}

const saveDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
};

const medDB = loadDataFromFile()

//create medication products
export const createMed = async(req, res) => {
    try{
        const { name, weight, code, image } = req.body
        if(!name||!weight||!code||!image) {
            return res.status(400).send({message: "Please fill all fields", error})
        }
        const med = {
            name,
            weight,
            code,
            image
        };

        medDB.push(med)
        saveDataToFile(medDB)
        res.status(200).send({msg: "medication successfully created", med})

    }catch(error){
        res.status(500).send({success: false, msg: `error creating ${med}`})
    }
};

export default medDB