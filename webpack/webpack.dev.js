const merge = require('webpack-merge');

const babelConfig = require('./webpack.babel');


module.exports = merge(babelConfig, {
    mode: 'development'
});