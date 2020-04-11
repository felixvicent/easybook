const express = require('express');
const routes = require('./routes');

require('./database/index');
const auth = require('./auth');
const app = express();

app.use(express.json());
app.use(routes);
app.use(auth().initialize());

module.exports = app;