const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: 'eval-cheap-source-map',
    devServer: {
        port: 3000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(jpeg|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
}