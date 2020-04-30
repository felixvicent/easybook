const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const BookController = require('./controllers/BookController');
const AuthController = require('./controllers/AuthController');
const FriendsController = require('./controllers/FriendsController');


const routes = express.Router();
const upload = multer(uploadConfig);
const auth = require('./auth');

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', upload.single('image'), UserController.store);        
routes.put('/users', upload.single('image'), UserController.update);
routes.delete('/users', UserController.destroy);

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books/:id', upload.single('image'), BookController.store);
routes.put('/books', upload.single('image'), BookController.update);
routes.delete('/books', BookController.destroy);

routes.post('/token', AuthController.auth);

routes.get('/all', FriendsController.index);
routes.get('/friends', FriendsController.friends);
routes.post('/friends/add/:id', FriendsController.addFriend);
routes.delete('/friends/del/:id', FriendsController.delFriend);

module.exports = routes;