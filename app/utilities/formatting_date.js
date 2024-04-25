function formatDate(dateString) {
    try {
        const [month, day, year] = dateString.split('-').map(part => parseInt(part)); // Ubah string menjadi bilangan bulat
        const date = new Date(year, month - 1, day); // Bulan dimulai dari 0, jadi kurangi 1
        if (isNaN(date.getTime())) { // Periksa apakah tanggal valid
            throw new Error('Invalid date format');
        }
        return date.toISOString().split('T')[0]; // Format tanggal ke ISO dan ambil bagian tanggalnya saja
    } catch (error) {
        console.error('Error formatting date:', error.message);
        return null; // Kembalikan null jika terjadi kesalahan
    }
}

module.exports = formatDate;