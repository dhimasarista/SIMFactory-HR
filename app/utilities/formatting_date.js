module.exports = (dateString) => {
    const [month, day, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
}