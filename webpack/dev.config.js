const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CONFIGURATION_MODE, fileNameJs, devServerPort, extensions, rules, alias } = require('./common');

const pathLocationForBundle = path.resolve(__dirname, '../', 'dist/dev');


exports.developmentConfiguration = {
    mode: CONFIGURATION_MODE.DEVELOPMENT,
    resolve: { extensions, alias },
    output: {
        publicPath: '/',
        filename: fileNameJs,
        path: pathLocationForBundle,
        clean: true,
    },
    module: {
        rules: [
            ...rules,
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        liveReload: true,
        port: devServerPort,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.htm',
        }),
    ],
};