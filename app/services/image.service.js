const fs = require('fs');
const exif = require('exif-parser');
const lwip = require('lwip');

const processImage = (path) => {
    // path is the path to your image
    fs.readFile(path, (err, data) => {
        if (err) throw err;
        let exifData = false;
        // ext is the extension of the image
        if (ext === 'jpg') {
            exifData = exif.create(data).parse();
        }
        lwip.open(data, ext, (err, image) => {
            if (err) throw err;
            if (exifData) {
                switch(exifData.tags.Orientation) {
                    case 2:
                    image = image.batch().flip('x'); // top-right - flip horizontal
                    break;
                    case 3:
                    image = image.batch().rotate(180); // bottom-right - rotate 180
                    break;
                    case 4:
                    image = image.batch().flip('y'); // bottom-left - flip vertically
                    break;
                    case 5:
                    image = image.batch().rotate(90).flip('x'); // left-top - rotate 90 and flip horizontal
                    break;
                    case 6:
                    image = image.batch().rotate(90); // right-top - rotate 90
                    break;
                    case 7:
                    image = image.batch().rotate(270).flip('x'); // right-bottom - rotate 270 and flip horizontal
                    break;
                    case 8:
                    image = image.batch().rotate(270); // left-bottom - rotate 270
                    break;
                }
            } else {
                image = image.batch();
            }
            // save image or do something else
        });
    });
}

module.exports = { processImage };
