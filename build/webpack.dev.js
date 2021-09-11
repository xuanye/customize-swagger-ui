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
            /*
            '/v2': {
                target: 'http://petstore.swagger.io',
                secure: true, //接受对方是https的接口
                changeOrigin: true, // 是否需要跨域
            },*/
        },
    },
});
