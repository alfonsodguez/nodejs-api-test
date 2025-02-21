import express from 'express';
import connectDB from '../../config/database.js';

const app = express();

// Middlewares
app.use(express.json());

module.exports = { app, connectDB };