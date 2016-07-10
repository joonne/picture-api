// app/controllers/default.js

'use strict';

const express = require('express');
const router = express.Router();
const config = require('../../config/config');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
    return res.sendFile(`${config.root}/index.html`);
});

router.get('/slideshow', (req, res) => {
    return res.sendfile(`${config.root}/app/pages/slideshow.html`)
});
