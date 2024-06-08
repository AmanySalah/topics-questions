import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import app from './server/express/app.js';
import { port } from './config/env/index.js';
import logger from './common/utils/logger.js';
import {
  startMongoConnection,
  closeMongoConnection
} from './config/dbConnection/mongoDBConnection.js';
import { prepareDBData } from './common/utils/service.js';

const startServer = async () => {
  process.on('warning', warning =>
    logger.warn(
      `Warning: ${warning.name}: ${warning.message}\nStack Trace: ${warning.stack}`
    )
  );

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled Rejection at: ${JSON.stringify(promise)}, reason: ${reason}, Stack Trace: ${reason.stack}`
    );
  });

  await startMongoConnection();

  const server = app.listen(port, () => {
    logger.info(`Server is running and listening on port ${port}`);
  });

  await prepareDBData();

  process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down gracefully...');
    server.close(() => {
      closeMongoConnection();
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down immediately...');
    server.close(() => {
      closeMongoConnection();
      process.exit(0);
    });
  });
};

startServer();
