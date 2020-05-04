const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

require('./database/index');
const auth = require('./auth');
const app = express();

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(express.json());
app.use(routes);
app.use(auth().initialize());

module.exports = app;