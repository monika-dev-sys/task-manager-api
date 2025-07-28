const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0'
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Buy milk' },
            description: { type: 'string', example: 'Get milk from the store' },
            status: { type: 'string', enum: ['pending', 'completed'], example: 'pending' },
            dueDate: { type: 'string', format: 'date', example: '2025-05-20' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
