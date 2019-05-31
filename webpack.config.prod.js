const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin'); 
const ZipPlugin = require('zip-webpack-plugin');

const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new ZipPlugin({
            path: '../zip',
            filename: 'extension'
        })
    ]
});