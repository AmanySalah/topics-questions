import express from 'express';
import controller from './controllers/index.js';
import { GET_TOPICS_QUESTIONS } from './helpers/constants.js';

const router = express.Router();

router.get('/search', controller[GET_TOPICS_QUESTIONS]);

export default router;
