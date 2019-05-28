const CopyPlugin = require('copy-webpack-plugin'); 

module.exports = {
    entry: './src/extension.js',
    output: {
        filename: 'extension.js'
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'static/**/*',
                flatten: true
            },
            'image/**/*',
            'lib/**/*',
            'manifest.json'
        ])
    ]
};