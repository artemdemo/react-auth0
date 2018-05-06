const webpackCommonFactory = require('./webpack-common.config');
const { staticCommons } = require('./commonChunks');
const proxy = require('./proxy');

/**
 * @param options {Object} - see required params in `webpack-common.config.js`
 */
module.exports = (options) => {
    const webpackCommon = webpackCommonFactory(options);
    return Object.assign(webpackCommon, {
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            contentBase: `${options.buildFolder}/`,
            historyApiFallback: true,
            proxy,
        },
        devtool: 'source-map',
        plugins: webpackCommon.plugins.concat([
            staticCommons(),
        ]),
    });
};
