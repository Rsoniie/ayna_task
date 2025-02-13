// server.ts
import { createStrapi } from '@strapi/strapi';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

async function bootstrap() {
  // Create and load the Strapi instance
  const app = createStrapi();
  await app.load();

  // Access the underlying Koa app that Strapi uses internally
  const koaApp = app.server.app;

  // Create one HTTP server using Koa's callback
  const server = createServer(koaApp.callback());

  // Attach Socket.IO to the same HTTP server
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Adjust CORS as needed
      methods: ['GET', 'POST'],
    },
  });

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    app.log.info(`Socket connected: ${socket.id}`);

    socket.on('client_message', (message) => {
      app.log.info('Received message from client:', message);
      socket.emit('server_message', message);
    });

    socket.on('disconnect', () => {
      app.log.info(`Socket disconnected: ${socket.id}`);
    });
  });

  // Listen on the port from environment variables or default to 1337
  const port = process.env.PORT || 1337;
  server.listen(port, () => {
    app.log.info(`Server is running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Error starting server:', error);
});
