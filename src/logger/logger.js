/**
 * @file logger.js
 * @description This file is responsible for logging all the requests made to the server.
 * 
 */

const colors = require('colors');
const { logSomething, logSomethingDB } = require('./filemanager');
const fs = require('fs');
function initLogger() {

}

function logInfo(...message) {
    for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'object') message[i] = JSON.stringify(message[i], null, 2);
    }
    process.stdout.write(`[INFO]`.bgGreen + ` ${message.join(' ')}\n`.green);
}

function logError(...message) {
    for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'object') message[i] = JSON.stringify(message[i], null, 2);
    }
    process.stdout.write(`[ERROR]`.bgRed + ` ${message.join(' ')}\n`.red);
}

function logWarning(...message) {
    for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'object') message[i] = JSON.stringify(message[i], null, 2);
    } process.stdout.write(`[WARNING]`.bgYellow + ` ${message.join(' ')}\n`.yellow);
}

function logVerbose(...message) {
    for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'object') message[i] = JSON.stringify(message[i], null, 2);
    } process.stdout.write(`[VERBOSE]`.bgCyan + ` ${message.join(' ')}\n`.cyan);
}

function logDev(...message) {
    for (let i = 0; i < message.length; i++) {
        if (typeof message[i] === 'object') message[i] = JSON.stringify(message[i], null, 2);
    }
    process.stdout.write(`[DEV]`.bgBlue + ` ${message.join(' ')}\n`.blue);
}

function logDatabase(message) {
    if (typeof message === 'object') message = JSON.stringify(message, null, 2);
    process.stdout.write(`[DATABASE]`.bgMagenta + ` ${message}\n`.magenta);
}

console.info = logInfo;
console.error = logError;
console.warn = logWarning;
console.log = logInfo;

module.exports = {
    logInfo,
    logError,
    logWarning,
    logDev,
    logVerbose,
    initLogger,
    logDatabase
}