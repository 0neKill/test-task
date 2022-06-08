const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CONFIGURATION_MODE, fileNameJs, extensions, fileNameStyle, rules, alias } = require('./common');


const pathLocationForBundle = path.resolve(__dirname, '../', 'dist/prod');

exports.productionConfiguration = {
    mode: CONFIGURATION_MODE.PRODUCTION,
    resolve: { extensions, alias },
    output: {
        filename: fileNameJs,
        path: pathLocationForBundle,
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.htm',
        }),
        new MiniCssExtractPlugin({
            filename: fileNameStyle,
        }),
    ],
};