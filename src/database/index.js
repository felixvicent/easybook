const Sequelize = require('sequelize');

const dbConfig = require('../config/database');

const User = require('../models/User');
const Book = require('../models/Book');

const config = process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development;

const connection = new Sequelize(config);

User.init(connection);
Book.init(connection);

User.associate(connection.models);
Book.associate(connection.models);

module.exports = connection;