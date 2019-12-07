const paths = require('./paths');
const path = require('path');
const WebpackNodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    name: 'for production',
    mode: 'production',
    devtool: 'cheap-module-source-map',
    externals: [WebpackNodeExternals()],
    resolve: {
        extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
        modules: ['node_modules'].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
    },
    plugins: [
        new EnvironmentPlugin({
            ENV: process.env.NODE_ENV || 'production',
            PORT: process.env.PORT || 4000,
            DB_URI: process.env.DB_URI,
            DB_USER: process.env.DB_USER,
            DB_PASS: process.env.DB_PASS,
        }),
        new ForkTsCheckerWebpackPlugin(),
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],
    entry: {
        server: ['./src/server'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                },
            },
        ],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
    },
};
