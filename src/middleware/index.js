const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('../router');
const errorMiddleware = require('./error-middleware');

const app = express();

// Parses incoming JSON payloads and attaches the parsed data to req.body.
// Required for handling JSON-based APIs.
app.use(express.json());

// Parses cookies from the incoming requests and attaches them to req.cookies.
// Useful for handling session and authentication data.
app.use(cookieParser());

// Attaches all API routes to the '/api' path.
app.use('/api', router);

// Centralized error-handling middleware to handle application errors.
app.use(errorMiddleware);

module.exports = app;
