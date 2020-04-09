const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);        
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books/:id', upload.single('image'), BookController.store);
routes.put('/books/:id', upload.single('image'), BookController.update);
routes.delete('/books/:id', BookController.destroy);

module.exports = routes;