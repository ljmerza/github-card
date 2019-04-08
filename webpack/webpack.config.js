const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        "github-card": './src/index.js',
    },
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

