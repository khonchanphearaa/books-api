import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Application } from 'express';
import bookRoutes from './routes/bookRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.js';
const app: Application = express();
const PORT = process.env.PORT;


// Middleware
app.use(cors());
app.use(loggerMiddleware);
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});