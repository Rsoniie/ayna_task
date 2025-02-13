
// import http from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import connectDB from './db.js';

// dotenv.config();

// await connectDB();

// const httpServer = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end('Socket server is running.');
// });

// const io = new Server(httpServer, {
//   cors: {
//     origin: '*', 
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('client_message', (message) => {
//     console.log('Received message:', message);
//     socket.emit('server_message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// const port = process.env.PORT || 3001;

// httpServer.listen(port, () => {
//   console.log(`Socket server running on port ${port}`);
// });


import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use('/auth', authRoutes);


const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('client_message', (message) => {
        console.log('Received message:', message);
        socket.emit('server_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
