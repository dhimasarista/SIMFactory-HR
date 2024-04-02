const os = require('os');

const metrics = () => {
        // Mendapatkan penggunaan memori
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // Mendapatkan kecepatan eksekusi
    const startTime = process.hrtime();
    const endTime = process.hrtime(startTime);
    const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e6; // dalam milidetik

    // Menyusun data untuk ditampilkan
    const metrics = {
        totalMemory: totalMemory,
        freeMemory: freeMemory,
        usedMemory: usedMemory,
        executionTime: executionTime
    };
    // Mengirimkan data
    return metrics;
}

module.exports = metrics;