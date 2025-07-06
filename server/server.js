import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebHooks, stripeWebhooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRouter.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// ✅ Step 1: Connect DBs
await connectDB();
await connectCloudinary();

// ✅ Step 2: Raw route first for Stripe
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// ✅ Step 3: Use global middlewares
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json()); // Now safe to use

// ✅ Step 4: Other routes
app.post('/clerk', clerkWebHooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);

// ✅ Step 5: Test route
app.get('/', (req, res) => res.send('API Working'));

// ✅ Step 6: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at ${PORT}`);
});
