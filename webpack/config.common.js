const path = require('path');


const rootPath = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        "github-card": path.resolve(rootPath, './src/index.js'),
    },
    output: {
        filename: '[name].js',
        path: rootPath,
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
