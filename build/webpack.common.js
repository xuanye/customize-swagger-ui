const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const theme = require('./theme');
const path = require('path');

module.exports = {
    entry: {
        main: {
            import: './src/index.js',
            // main.js 需要提取出来的依赖，值为字符串（值只能是字符串）
            dependOn: 'shared',
        },
        shared: ['antd', 'axios', 'react', 'react-dom', 'react-json-view'],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, '../public/static'), to: './' }],
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: path.resolve(__dirname, '../public/index.html'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.json', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: theme,
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
