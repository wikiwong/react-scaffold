const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:9000/',
            'webpack/hot/dev-server',
            path.resolve('src', 'client', 'index.js')
        ]
    },
    target: 'web',
    output: {
        path: path.resolve("./dist"),
        publicPath: 'http://localhost:9000/',
        filename: "[name].js"
    },
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
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            fallback: 'style-loader',
                            importLoaders: 2,
                            localIdentName: '[local]__[hash:6]',
                            modules: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            })
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader',
                    options: {
                        fallback: 'style-loader',
                        localIdentName: '[local]__[hash:6]',
                        modules: true
                    }
                },
            })
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
};