import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description:
                'A simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // Files containing annotations
};

export default swaggerOptions;