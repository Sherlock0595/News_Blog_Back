import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config';
import { checkAuth } from './utils/index.js';
import { UserController, PostController, CommentController } from './controllers/index.js';
import authRoutes from './routes/auth.Routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use('/auth', authRoutes);

app.use('/posts', postRoutes);
app.use('/posts/tags', postRoutes)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use('/', commentRoutes)

const PORT = process.env.PORT;

async function startServerAndConnectMDB() {
  try {
    await app.listen(PORT);
    await mongoose.connect(process.env.MONGO);
    console.log(`Сервер запущен http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
}

startServerAndConnectMDB();
