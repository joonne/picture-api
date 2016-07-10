// controllers/images.js

'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const glob = require('glob');
const config = require('../../config/config');

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, cb) {
      cb(null, String(Date.now()) + '.jpg');
    }
});

const upload = multer({ storage: storage });

module.exports = (app) => {
    app.use('/api/', router);
};

router.get('/images', (req, res) => {

    const images = glob.sync(__dirname + '/../../public/images/*')
        .map(image => {
            let start = image.lastIndexOf('/') + 1;
            return image.substr(start, image.length - start - 4);
        });

    return res.json(images).status(200);
});

router.post('/images', upload.single('photo'), (req, res) => {
    if (req.file) {
        return res.status(201).json('image uploaded successfully');
    }
    return res.status(500);
});
