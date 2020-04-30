const app = require('./app');

let port = 0;

switch(process.env.NODE_ENV) {
    case 'test':
        port = 3333;
        break;
    case 'development':
        port = 3333;
        break;
    default:
        port = 8080;
}

app.listen(port);