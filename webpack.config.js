'use strict';

const path = require ('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, 'dashboard', 'index')
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: /dashboard/,
            loader: 'babel-loader'
        }]
    }
};