const red = `\x1b[31m%s\x1b[0m`;
const green = `\x1b[32m%s\x1b[0m`;
const yellow = `\x1b[33m%s\x1b[0m`;
const blue = `\x1b[34m%s\x1b[0m`;
const magenta = `\x1b[35m%s\x1b[0m`
const cyan = `\x1b[36m%s\x1b[0m`;

const info = `[info]`;
const error = `[error]`;

function errorLogging(message) {
    console.log(red, `${error} ${message}`);
}

function infoLogging(message) {
    console.log(cyan,` ${info} ${message}`);
}

function successLogging(message) {
    console.log(green,` ${info} ${message}`);
}

module.exports = {
    errorLogging,
    infoLogging,
    successLogging,
}