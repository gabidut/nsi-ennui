const path = require('path');
const fs = require('fs');

const folder = path.resolve(__dirname, '../../../logs');

function logSomething(content) {
    let date = new Date();
    let filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
    let stacktrace = new Error().stack;
    stacktrace = stacktrace.split('\n')[3];
    stacktrace = stacktrace.substring(7);
    let log = `${date.toISOString()} - ${stacktrace} - ${content}\n`;
    fs.appendFile(`${folder}/${filename}`, log, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

function logSomethingDB(content) {
    let date = new Date();
    let filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_db.log`;
    let stacktrace = new Error().stack;
    stacktrace = stacktrace.split('\n')[3];
    stacktrace = stacktrace.substring(7);
    let log = `${date.toISOString()} - ${stacktrace} - ${content}\n`;
    fs.appendFile(`${folder}/${filename}`, log, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = {
    logSomething,
    logSomethingDB
}