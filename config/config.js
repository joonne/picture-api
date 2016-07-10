// config/config.js

'use strict';

const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const port = 10010;
// const server_ip_address = '127.0.0.1';
const server_ip_address = '0.0.0.0';
const name = 'picture-api';

const config = {
    root: rootPath,
    app: {
      name: name
    },
    port: port,
    ip_address: server_ip_address
};

module.exports = config;
