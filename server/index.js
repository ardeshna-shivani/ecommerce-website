import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDb from './config/connectDb.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import myListRouter from './route/myList.route.js';
import addressRouter from './route/address.route.js';

dotenv.config(); // Load environment variables

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/myList', myListRouter);
app.use('/api/address', addressRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${process.env.PORT}` });
});

// Catch-all for SPA (if using React frontend)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Connect DB and start server
connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on port", process.env.PORT);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
});