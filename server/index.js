import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


import { getApiHealth } from './controllers/health.js';
import { postApiTransaction, getApiTransactions ,getApiTransactionbyId, getApiTransactionbyUserId,updateUserTransaction,deleteUserTransaction} from './controllers/transaction.js';
// import { getApiTransactions } from './controllers/transaction.js';
import { postApiLogin } from "./controllers/login.js";
import {postApiSignup} from "./controllers/signup.js";

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn) {
            console.log("MongoDB connected..😍");
        }
    }
    catch (e) {
        console.log(e.message)
    }
};
connectDB();

app.get('/api/health', getApiHealth);


app.post('/api/transaction', postApiTransaction);


// fetch all data
app.get('/api/transactions', getApiTransactions);

// POST / Login

app.post('/api/login', postApiLogin);

// POST / signup

app.post('/api/signup', postApiSignup);

// fetch transaction by id
app.get('/api/transactions/:id',getApiTransactionbyId)

// fetch trasanction by single user
app.get('/api/transaction/users/:id',getApiTransactionbyUserId)

app.put('/api/transactions/:id',updateUserTransaction)

app.delete('/api/transactions/:id',deleteUserTransaction)




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});