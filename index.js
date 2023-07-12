import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';

import cors from 'cors';
import 'dotenv/config';
import {registerValidation, loginValidation, postCreateValidation,  } from './validations.js'

import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },

    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });



app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login),
    app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);




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