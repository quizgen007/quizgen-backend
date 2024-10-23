import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Docs',
            version: '1.0.0',
            description:
                'An API application made with Express and documented with Swagger',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',  // Optional, specify JWT format if used
                }
            }
        },
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Files containing annotations
};

export default swaggerOptions;