const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: '돌맹',
            version: '1.0.0',
            description: '돌맹입니다',
          },
          servers: [
            {
              url: "http://localhost:8080",
            }
          ],
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};