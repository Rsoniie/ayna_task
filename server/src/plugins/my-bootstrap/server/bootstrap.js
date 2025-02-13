export default {
    async register() {
    },
    async bootstrap({ strapi }) {
      strapi.log.info('My bootstrap code is running!');
    },
    async destroy() {
    }
  };
  
  