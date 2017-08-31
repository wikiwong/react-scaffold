const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: "./app/index.js"
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};