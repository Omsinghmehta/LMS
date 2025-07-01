import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkWebHooks } from './controllers/webhooks.js';
import connectDB from './configs/mongodb.js';

const app=express();
await connectDB()
app.use(cors());

app.get('/',(req,res)=>res.send('API Working'));
app.post('/clerk',express.json(),clerkWebHooks);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})
