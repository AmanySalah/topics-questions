import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './router.js';
import { API_BASE_PATH } from '../../config/env/index.js';
import { ErrorHandler } from '../../common/utils/errorHandler.js';

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({ maxAge: 3600 }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(`${API_BASE_PATH}`, router);
app.use(ErrorHandler());

export default app;
