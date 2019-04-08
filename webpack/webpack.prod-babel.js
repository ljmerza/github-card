const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod');
const babelConfig = require('./webpack.babel');


module.exports = merge(prodConfig, babelConfig, {
    output: {
        filename: '[name]-babel.js'
    }
});
