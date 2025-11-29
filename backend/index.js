//importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//importing routes
import userRoutes from './routes/userRoutes.js';
import phoneRoutes from './routes/phoneRoutes.js';
import userAccess from './authorizarion/userAccess.js';

//configuring environmental variables
dotenv.config();

//initializing express and using middlwares
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//initializing routes
app.use('/api/users', userRoutes);
app.use('/api/phones', phoneRoutes);
app.use('/api/userAccess', userAccess);

app.get('/', (req, res) => {
    res.send('Listening correctly....')
})

app.listen(process.env.PORT, () => {
    console.log(`Port ${process.env.PORT} is now live`);
})