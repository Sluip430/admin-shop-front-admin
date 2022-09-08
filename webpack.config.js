const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: { 
        main: './js/index.js',
        forgotPassword: './js/forgotPassword.js',
        productManagment: './js/productManagment.js',
        addProduct: './js/addProduct.js',
        clientManagment: './js/clientManagment.js',
        orders: './js/orders.js'
    },
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve('src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['main']
        }),
        new HTMLWebpackPlugin({
            template: path.resolve('src/forgotPassword.html'),
            filename: 'forgotPassword.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['forgotPassword']
        }),
        new HTMLWebpackPlugin({
            template: path.resolve('src/productManagment.html'),
            filename: 'productManagment.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['productManagment']
        }),
        new HTMLWebpackPlugin({
            template: path.resolve('src/addProduct.html'),
            filename: 'addProduct.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['addProduct']
        }),
        new HTMLWebpackPlugin({
            template: path.resolve('src/clientManagment.html'),
            filename: 'clientManagment.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['clientManagment']
        }),
        new HTMLWebpackPlugin({
            template: path.resolve('src/orders.html'),
            filename: 'orders.html',
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ['orders']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
    ],
    module: {
        rules: [
            {
                test: /.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
              }
        ]
    },
    devServer: {
        port: 4200
    }
};