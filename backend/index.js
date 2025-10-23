import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/database.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Listening....')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})