import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configs
import connectDB from './config/db';

// routes
import authRoutes from './routes/auth.routes';
import { errorHandler } from './utils/errorHandler';

const app = express();
dotenv.config();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();


// Routes
app.use('/api/auth', authRoutes);


// Global Error Handler
app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}`);
});

export default app;