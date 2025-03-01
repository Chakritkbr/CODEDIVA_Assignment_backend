import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './db';
import userRoute from './users/userRoute';
import categoryRoute from './category/categoryRoute';
import productRoute from './product/productRoute';

dotenv.config({ path: './.env' });
const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.set('prisma', prisma);

app.use('/auth', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);

export default app;
