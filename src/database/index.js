const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../models/User');

const config = process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development;

const connection = new Sequelize(config);

User.init(connection);

module.exports = connection;