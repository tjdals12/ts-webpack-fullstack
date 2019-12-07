import app from './app';
import * as db from './model';
import config from './config';
import logger from './logger';

const { port } = config;

async function main(): Promise<void> {
    const type = await db.connect();
    logger.info(`Conncected ${type}`);
    await app.listen(port);
    logger.info('Server running at localhost:4000');
}

main();
