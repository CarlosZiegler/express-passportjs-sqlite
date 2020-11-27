const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Title Project',
      description: 'Description Project',
      contact: {
        name: 'Carlos Ziegler',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['src/routes/AuthRoutes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
    },
  };
};

const options = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin],
  },
};

module.exports = { swaggerUI, swaggerDocs, options };
