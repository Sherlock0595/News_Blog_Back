import mongoose from 'mongoose';
import express from 'express';

import cors from 'cors';
import 'dotenv/config';
import { loginValidation, postCreateValidation, registerValidation } from './validations.js'

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

const app = express();
app.use(cors());
app.use(express.json());


app.post('/auth/login', loginValidation, UserController.login),
    app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts',checkAuth, postCreateValidation, PostController.remove);
// app.patch('/posts', PostController.update);




const PORT = process.env.PORT

async function startServerAndConnectMDB() {
    try {
        await app.listen(PORT)
        await mongoose.connect(process.env.MONGO)
        console.log(`Сервер запущен http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
};

startServerAndConnectMDB();