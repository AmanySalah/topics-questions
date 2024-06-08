import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const port = process.env.PORT;

export const mongoConfigs = {
  mongoURL: process.env.MONGO_URL
};

const API_BASE_URL = '/api';
const API_VERSION = 'v1';

export const API_BASE_PATH = `${API_BASE_URL}/${API_VERSION}`;
