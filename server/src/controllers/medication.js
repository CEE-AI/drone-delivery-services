import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = path.join(__dirname, '..', 'data', 'meds.json');

const loadDataFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error loading data from file:', error);
        return [];
    }
};

const saveDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const medDB = loadDataFromFile();

const storage = multer.diskStorage({
    destination: './assets/images',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = file.originalname.replace(/[^a-zA-Z0-9]/g, '') + '-' + uniqueSuffix;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

// Create medication products
export const createMed = async (req, res) => {
    try {
        const { name, weight, code } = req.body;

        console.log('Received request to create medication:');
        console.log('name:', name);
        console.log('weight:', weight);
        console.log('code:', code);

        if (name==='' || weight==='' || code==='') {
            console.log('Missing fields: name, weight, or code');
            return res.status(400).send({ message: 'Please fill all fields' });
        }

        const image = req.file; // Get the uploaded image file

        console.log('Received image:', image);

        if (!image) {
            console.log('No image uploaded');
            return res.status(400).send({ message: 'Please upload an image' });
        }

        const med = {
            name,
            weight,
            code,
            image: image.filename, // Save the filename of the uploaded image
        };

        const existingMed = medDB.find((m) => m.code === code);

        if (existingMed) {
            console.log('Medication item already registered:', existingMed);
            return res.status(400).send({ message: 'Medication item already registered' });
        }

        const alphanumericOnly = /^[A-Z0-9_]+$/;

        if (!alphanumericOnly.test(code)) {
            console.log('Invalid code format:', code);
            return res.status(400).json({ error: 'Input should contain uppercase alphabets, numbers, and _.' });
        }

        medDB.push(med);
        saveDataToFile(medDB);

        console.log('Medication successfully created:', med);
        res.status(200).send({ msg: 'Medication successfully created', med });
    } catch (error) {
        console.log('Error creating medication:', error);
        res.status(500).send({ success: false, msg: 'Error creating medication' });
    }
};

export default medDB;
