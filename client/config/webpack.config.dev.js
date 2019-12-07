const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractLoader = require('mini-css-extract-plugin');
const ForkTsChekcerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    name: 'for development',
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractLoader({ filename: 'style.css' }),
        new ForkTsChekcerWebpackPlugin(),
        new HardSourceWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.resolve('./public'),
        index: 'index.html',
        port: 3000,
        hot: true,
        proxy: {
            '/api': 'http://localhost:4000',
        },
    },
    entry: {
        app: ['./src/index'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractLoader.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractLoader.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets',
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
