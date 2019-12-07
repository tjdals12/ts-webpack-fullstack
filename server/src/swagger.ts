import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerStats from 'swagger-stats';

const options: object = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Express with typescript',
            description: 'Sample API',
            version: '0.0.0',
        },
        host: 'localhost:4000',
        basePath: '/api/v1',
    },
    apis: ['./src/apis/**/*.spec.yaml'],
});

const swaggerConfig: (app: Express) => void = app => {
    app.use('/swagger-apis', swaggerUI.serve, swaggerUI.setup(options));
    app.use(swaggerStats.getMiddleware({ swaggerSpec: options }));
};

export default swaggerConfig;
