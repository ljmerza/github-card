const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        "github-card": './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin()  
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname),
        publicPath: '/local/github-card/'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                include: [
                    /node_modules(?:\/|\\)lit-element|lit-html/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/env"],
                        ],
                        plugins: [
                            "@babel/plugin-transform-modules-umd"
                        ]
                    }
                }
            }   
        ]
    }
};

