import express from 'express';
import type { Application } from 'express';
import bookRoutes from './routes/bookRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares/logger.js';

dotenv.config({ path: './src/.env' });
const app: Application = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(loggerMiddleware);
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(' Server is running!');
});