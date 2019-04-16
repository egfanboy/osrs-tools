const path = require('path');

module.exports = {
    entry: path.join(__dirname, '..', 'main', 'index.js'),
    output: {
        path: path.resolve(__dirname, '..', 'public'),
        filename: 'electron.js',
    },
    target: 'electron-main',
};
