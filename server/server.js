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
import path from 'path';

const app = express();

await connectDB();
await connectCloudinary();
const _dirname=path.resolve();

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);
app.post('/clerk', express.json(),clerkWebHooks);

app.use(cors());
app.use(clerkMiddleware());

app.use('/api/educator',express.json(), educatorRouter);
app.use('/api/course',express.json(), courseRouter);
app.use('/api/user',express.json(), userRouter);

// app.get('/', (req, res) => res.send('API Working'));

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(_dirname, "client", "dist")));
app.get(/(.*)/,(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
