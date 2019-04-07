const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "55",
                chrome: "50",
                safari: "10",
            }
        },
    ],
];

const plugins = [
    "@babel/plugin-transform-modules-umd"
];

module.exports = {
    mode: 'development',
    entry: {
        "github-card": './src/index.js',
        "github-card-editor": './src/index-editor.js'
    },
    plugins: [
        new CleanWebpackPlugin()  
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets,
                        plugins
                    }
                }
            }   
        ]
    }
};

