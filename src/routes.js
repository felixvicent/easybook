const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();
const upload = multer(uploadConfig);
const auth = require('./auth');

routes.get('/users',  auth().authenticate(), UserController.index);
routes.post('/users', upload.single('image'), UserController.store);        
routes.put('/users', upload.single('image'), UserController.update);
routes.delete('/users', UserController.destroy);


routes.use('/books',(req, res) => {
    auth().authenticate();
    next();
});

routes.use('/books/:id',(req, res) => {
    auth().authenticate();
    next();
});

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books/:id', upload.single('image'), BookController.store);
routes.put('/books/:id', upload.single('image'), BookController.update);
routes.delete('/books/:id', BookController.destroy);

routes.post('/token', AuthController.auth);

module.exports = routes;