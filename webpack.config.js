const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader' }]
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};