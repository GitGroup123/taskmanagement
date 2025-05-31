const express = require('express');
const appMiddleware = require('./middleware/appMiddleware.js');
const routes = require('./routes');

const app = express();

appMiddleware(app);
app.use('/api', routes);

module.exports = app;