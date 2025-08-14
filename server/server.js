import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkWebHooks, stripeWebhooks } from './controllers/webhooks.js';
import {  clerkMiddleware } from '@clerk/express';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import educatorRouter from './routes/educatorRoutes.js';
import courseRouter from './routes/courseRouter.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/Message.js';

const app = express();

await connectDB();
await connectCloudinary();
const _dirname = path.resolve();

app.use(cors());
app.use(clerkMiddleware());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.post('/clerk', express.json(),clerkWebHooks);
app.use('/api/educator',express.json(), educatorRouter);
app.use('/api/course',express.json(), courseRouter);
app.use('/api/user',express.json(), userRouter);
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

app.get('/api/messages/:chatId', async (req, res) => {
  try {
    const message = await Message.find({ chatId: req.params.chatId }).sort({ createdAt: 1 });
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

let chatMessages = {};

io.on("connection", (socket) => {
  const { courseId, instructorId } = socket.handshake.query;

  if (!courseId || !instructorId) {
    console.log(" Missing query params");
    return;
  }

  const roomId = `${courseId}_${instructorId}`;
  socket.join(roomId);

  if (chatMessages[roomId]) {
    socket.emit("loadMessages", chatMessages[roomId]);
  } else {
    chatMessages[roomId] = [];
  }

  socket.on("sendMessage", (msg) => {
    const messageData = {
      senderId: msg.senderId,
      message: msg.message,
      timestamp: new Date(),
    };

    chatMessages[roomId].push(messageData);
    io.to(roomId).emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.use(express.static(path.join(_dirname, 'client', 'dist')));
app.get(/(.*)/, (_, res) => {
  res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running at ${PORT}`));
