// controllers/images.js

'use strict';

const multer = require('multer');
const glob = require('glob');
const config = require('../../config/config');
const exif = require('fast-exif');

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, cb) {
      cb(null, String(Date.now()) + '.jpg');
    }
});

const upload = multer({ storage: storage });

module.exports = (app, io) => {
    app.get('/api/images', (req, res) => {
        const images = glob.sync(__dirname + '/../../public/images/*')
            .map(image => {
                let start = image.lastIndexOf('/') + 1;
                return image.substr(start, image.length - start - 4);
            });

        return res.status(200).json(images);
    });

    app.post('/api/images', upload.single('photo'), (req, res) => {
        if (req.file) {
            const file = req.file.filename;
            const filename = file.substr(0, file.length - 4);
            io.emit('image', { filename });
            return res.redirect('http://192.168.1.100:5900');
        }
        return res.status(500);
    });
};
