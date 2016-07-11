// app/controllers/default.js

'use strict';

const config = require('../../config/config');

module.exports = (app) => {
    app.get('/', (req, res) => {
        return res.sendFile(`${config.root}/index.html`);
    });

    app.get('/slideshow', (req, res) => {
        return res.sendFile(`${config.root}/app/pages/slideshow.html`)
    });
};
