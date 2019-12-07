import express, { Express } from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger';
import router from 'router';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
swagger(app);
app.use(router);

export default app;
