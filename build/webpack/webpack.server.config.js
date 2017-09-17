const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {
        server: path.resolve('src', 'server', 'index.js')
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].js"
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        }]
    }
};