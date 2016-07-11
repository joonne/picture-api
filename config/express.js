// config/express.js

'use strict';

const express = require('express');
const glob = require('glob');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('serve-favicon');

module.exports = (app, config, io) => {

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(express.static(config.root + '/public'));
    app.use(favicon(`${config.root}/public/favicon.ico`));
    app.use(cors());

    const controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach((controller) => {
        require(controller)(app, io);
    });

    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {},
            title: 'error'
        });
    });
};
