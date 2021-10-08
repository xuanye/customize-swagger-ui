const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: '8600',
        open: true,
        proxy: {
            /**/

            '/api': {
                target: 'http://localhost:5000',

                secure: false,
                changeOrigin: true,
            },
            '/v2': {
                target: 'http://localhost:5000',

                secure: false,
                changeOrigin: true,
            },
        },
    },
});
