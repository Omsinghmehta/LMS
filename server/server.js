import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkWebHooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';

const app=express();

await connectDB()
await connectCloudinary();

app.use(cors());
app.use(clerkMiddleware());



app.post('/clerk',express.json(),clerkWebHooks);
app.use('/api/educator', educatorRouter);      
app.get('/',(req,res)=>res.send('API Working'));


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})
