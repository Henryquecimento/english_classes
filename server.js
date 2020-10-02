const express = require('express');
const nunjucks = require('nunjucks');
const routers = require('./routes');

const server = express();

server.use(express.static('public'));
server.use(routers);

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true,
});

server.listen(5000, function () {
    console.log('Server is running normally');
});
