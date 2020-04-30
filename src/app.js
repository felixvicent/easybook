const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database/index');
const auth = require('./auth');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(auth().initialize());

module.exports = app;