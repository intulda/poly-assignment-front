const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const dotenv = require('dotenv');
const devMode = process.env.NODE_ENV !== "production";
dotenv.config();

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        publicPath: '/',
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
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: "ts-loader",
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: '/node_modules/',
                use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        })
    ]
}
