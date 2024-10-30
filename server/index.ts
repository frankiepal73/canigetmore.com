import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import salaryRoutes from './routes/salary';
import companyRoutes from './routes/company';
import paymentRoutes from './routes/payment';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// For Stripe webhook
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});