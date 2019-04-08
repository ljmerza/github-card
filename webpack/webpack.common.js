const path = require('path');


module.exports = {
    mode: 'development',
    entry: {
        "github-card": './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../'),
        publicPath: '/local/github-card/'
    }
};
