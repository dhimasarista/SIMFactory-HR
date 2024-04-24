function formatDate (dateString) {
    const [month, day, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
}

module.exports = formatDate;