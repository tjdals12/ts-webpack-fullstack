require('dotenv').config();
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(`${appDirectory}`, folder))
    .join(path.delimiter);

const moduleFileExtensions = ['ts'];

module.exports.moduleFileExtensions = moduleFileExtensions;
