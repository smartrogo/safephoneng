import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './config/database.js';

import userRoutes from './routes/userRoutes.js';
import phoneRoutes from './routes/phoneRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('api/user', userRoutes);
app.use('api/phones', phoneRoutes);

app.get('/', (req, res) => {
    res.send('Listening....')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})