import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebHooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRouter.js';

const app = express();
//  Connect DBs
await connectDB();
await connectCloudinary();
//  Middlewares
app.use(cors());
app.use(clerkMiddleware()); 
app.use(express.json());   

app.post('/clerk', clerkWebHooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course',express.json(),courseRouter);
app.get('/', (req, res) => res.send('API Working'));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
