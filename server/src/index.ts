// import type { Core } from '@strapi/strapi';

// export default {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/* { strapi }: { strapi: Core.Strapi } */) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
// };



import type { Core } from '@strapi/strapi';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('Register custom configurations or services here');
  },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('Bootstrap actions like setting up real-time WebSocket communication');

    const setupWebSocketServer = () => {
      const httpServer = http.createServer(strapi.app);
      const io = new SocketIOServer(httpServer, {
        cors: {
          // origin: "http://localhost:3000", // Adjust according to your front-end URL
          origin : "*",
          methods: ["GET", "POST"]
        }
      });

      io.on('connection', (socket) => {
      strapi.log.info('A user connected:', socket.id);

        socket.on('client_message', (message) => {
          strapi.log.info('Message received from client:', message);
          // Echo the message back to the client
          socket.emit('server_message', message);
        });

        socket.on('disconnect', () => {
          strapi.log.info('User disconnected:', socket.id);
        });
      });

      httpServer.listen(3001, () => {
        strapi.log.info('WebSocket server running on port 3001');
      });
    };

    setupWebSocketServer();
  },
};




// import type { Core } from '@strapi/strapi';

// export default {
//   async register({ strapi }: { strapi: Core.Strapi }) {
//     strapi.log.info('Register hook executed.');
//   },

//   async bootstrap({ strapi }: { strapi: Core.Strapi }) {
//     try {
//       strapi.log.info('Bootstrap hook executed.');
//       console.log('Bootstrap hook executed.');
//     } catch (error) {
//       strapi.log.error('Error in bootstrap:', error);
//       console.error('Error in bootstrap:', error);
//     }
//   },
// };
