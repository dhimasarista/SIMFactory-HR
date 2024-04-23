const sharp = require('sharp');
const fs = require('fs');

// Fungsi untuk mengompres gambar dan menyimpannya di direktori lain
async function compressAndSaveImage(inputPath, outputPath, quality) {
    try {
        // Membaca file gambar
        const inputImage = fs.readFileSync(inputPath);

        // Mengompres gambar dengan menggunakan sharp
        await sharp(inputImage)
            .jpeg({ quality }) // Atur kualitas kompresi JPEG
            .toFile(outputPath); // Simpan gambar yang telah dikompres ke dalam direktori lain

        console.log('Image compressed and saved successfully!');
    } catch (error) {
        console.error('Error compressing and saving image:', error);
    }
}

module.exports = compressAndSaveImage;