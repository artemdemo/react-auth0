const { UglifyJsPlugin } = require('webpack').optimize;
const { DefinePlugin } = require('webpack');
const WebpackChunkHash = require('webpack-chunk-hash');
const { staticCommons } = require('./commonChunks');
const webpackCommonFactory = require('./webpack-common.config');

/**
 * @param options {Object} - see required params in `webpack-common.config.js`
 */
module.exports = (options) => {
    const webpackCommon = webpackCommonFactory(options);
    return Object.assign(webpackCommon, {
        // @docs https://webpack.js.org/guides/caching/#deterministic-hashes
        output: Object.assign(webpackCommon.output, {
            filename: './js/[name].[chunkhash].js',
            chunkFilename: './js/[id].chunk-[chunkhash].js',
        }),
        plugins: webpackCommon.plugins.concat([
            // @docs https://webpack.js.org/guides/caching/
            new WebpackChunkHash(),

            staticCommons(true),

            new UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            }),

            new DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
        ]),
    });
};
