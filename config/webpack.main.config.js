const path = require('path');

module.exports = {
    entry: path.join(__dirname, '..', 'main', 'index.js'),
    output: {
        path: path.resolve(__dirname, '..', 'public'),
        filename: 'electron.js',
    },
    target: 'electron-main',
    node: {
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
        ],
    },
};
