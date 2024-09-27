const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer: {
        port: 9000,
    },
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        chunkFormat: 'array-push',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.worker\.js$/,  // Добавлено правило для Web Workers
                use: {
                    loader: 'worker-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/service.worker.js',
            swDest: 'service.worker.js',
        }),
    ],
};
