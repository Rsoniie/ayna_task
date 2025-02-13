// Import required modules
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create HTTP Server
const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Socket server is running.');
});

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Adjust this for production
    methods: ['GET', 'POST'],
  },
});

// Set up Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('client_message', (message) => {
    console.log('Received message:', message);
    // Echo the message back to the client
    socket.emit('server_message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Get PORT from .env file (with a default fallback)
const port = process.env.PORT || 3001;

// Start the server
httpServer.listen(port, () => {
  console.log(`Socket server running on port ${port}`);
});
