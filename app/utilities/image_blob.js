const path = require('path');
const fs = require("fs");
const { Blob } = require("buffer");
const mime = require("mime-types");

function imageToBlob(name, directory) {
    const filePath = path.join(directory, name);
    const imageBuffer = fs.readFileSync(filePath);
    const imageType = mime.lookup(filePath);

    if (!imageType) {
        throw Error("Format gambar tidak didukung!");
    }

    const imageBlob = Buffer.from(imageBuffer, 'binary');
    return {
        imageBlob,
        imageType,
    };
}

module.exports = imageToBlob;