//importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//importing routes
import userRoutes from './routes/userRoutes.js';
import phoneRoutes from './routes/phoneRoutes.js';

//configuring environmental variables
dotenv.config();

//initializing express and using middlwares
const app = express();
app.use(express.json());
app.use(cors());

//initializing routes
app.use('api/users', userRoutes);
app.use('api/phones', phoneRoutes);

app.get('/', (req, res) => {
    res.send('Listening....')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})