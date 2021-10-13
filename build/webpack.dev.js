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
                target: 'http://165.88.125.128:8312',

                secure: false,
                changeOrigin: true,
            },
            '/v2': {
                target: 'http://165.88.125.128:8312',

                secure: false,
                changeOrigin: true,
            },
        },
    },
});
