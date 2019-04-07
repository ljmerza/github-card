const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            }
        },
    ],
];

const plugins = [
    "@babel/plugin-transform-modules-umd"
];

module.exports = {
    entry: {
        "github-card": './src/index.js',
        "github-card-editor": './src/index-editor.js'
    },
    plugins: [
        new CleanWebpackPlugin()  
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib')
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

