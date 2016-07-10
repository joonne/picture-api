// app.js

'use strict';

const express = require('express');
const app = express();
const config = require('./config/config');

require('./config/express')(app, config);

app.listen(config.port, config.ipaddress, () => {
    console.log('listening at ' + config.ip_address + ':' + config.port);
});
