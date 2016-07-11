// app.js

'use strict';

const express = require('express');
const app = express();
const config = require('./config/config');
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./config/express')(app, config, io);

server.listen(config.port, config.ipaddress, () => {
    console.log('listening at ' + config.ip_address + ':' + config.port);
});

io.on('connection', (socket) => {
    io.emit('image', {filename: '1468267769115'});
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
