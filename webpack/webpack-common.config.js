/* eslint-disable no-console */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    IgnorePlugin,
    DefinePlugin,
    ContextReplacementPlugin,
} = require('webpack');
const {
    ModuleConcatenationPlugin,
} = require('webpack').optimize;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

/**
 * @param options {Object}
 * @param options.isProduction {Boolean}
 * @param options.buildFolder {String}
 * @param options.publicPath {String}
 * @param options.appVersion {String}
 */
module.exports = options => ({
    entry: {
        bundle: './source/index.jsx',
        common: [
            'react-redux',
        ],
    },
    output: {
        path: `${process.cwd()}/${options.buildFolder}`,
        filename: './js/[name].js',
        chunkFilename: './js/[id].chunk.js',
        publicPath: `${options.publicPath}/`,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react'),
            'react-router': path.resolve('./node_modules/react-router'),
            'react-redux': path.resolve('./node_modules/react-redux'),
            'react-dom': path.resolve('./node_modules/react-dom'),
            'prop-types': path.resolve('./node_modules/prop-types'),
        },
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
                    'less-loader',
                ],
            },
            {test: /\.(png|gif|jpg)$/, loader: 'url-loader?limit=8000&name=images/[hash].[ext]'},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'html-loader'},

            // Font Definitions
            {test: /\.(svg)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'},
            {test: /\.(woff)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'},
            {test: /\.(woff2)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'},
            {test: /\.([ot]tf)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'},
            {test: /\.(eot)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'},
        ],
    },
    plugins: [
        // ModuleConcatenationPlugin
        // * faster build
        // * faster execution time in the browser
        // @link https://webpack.js.org/plugins/module-concatenation-plugin/
        new ModuleConcatenationPlugin(),

        // Defining global ENV variable
        new DefinePlugin({
            ENV: {production: options.isProduction},
        }),
        new HtmlWebpackPlugin({
            template: './source/index.ejs',
            filename: './index.html',
            publicPath: options.publicPath,
            appVersion: options.appVersion,
        }),
        new ExtractTextPlugin('./css/styles-[hash].css'),

        // We are not using all locales from moment.js only what we need
        new ContextReplacementPlugin(/moment[/\\]locale$/, /en|de|fr|ja/),

        // Ignoring warnings for following plugins, case they doesn't matter
        new IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),

        new CleanWebpackPlugin([options.buildFolder], {
            verbose: true,
            dry: false,
            root: process.cwd(),
            exclude: ['.gitignore'],
        }),
    ],
});
