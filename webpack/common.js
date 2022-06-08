const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
const versionProject = packageJson.version;
const nameProject = packageJson.name;


exports.fileNameJs = `${nameProject}-${versionProject}.min.js`;

exports.fileNameStyle = `${nameProject}-[hash].min.css`;

exports.extensions = ['.js', '.ts', '.tsx'];

exports.devServerPort = 3000;

exports.CONFIGURATION_MODE = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

exports.alias = {
    '@components': path.resolve(__dirname, '../', 'src/components'),
    '@hooks': path.resolve(__dirname, '../', 'src/hooks'),
    '@pages': path.resolve(__dirname, '../', 'src/pages/'),
    '@helpers': path.resolve(__dirname, '../', 'src/helpers/'),
    '@assets': path.resolve(__dirname, '../', 'src/assets/'),
    '__types__': path.resolve(__dirname, '../', 'src/__types__/'),
};


exports.rules = [
    {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
            {
                options: {
                    outputPath: 'images',
                    name: '[name]-[sha1:hash:7].[ext]',
                },
            },
        ],
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        use: [
            {
                options: {
                    outputPath: 'fonts',
                    name: '[name]-[sha1:hash:7].[ext]',
                },
            },
        ],
    },
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
    },
];