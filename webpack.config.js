const config = require('./source/config');
const packageFile = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const configOptions = {
    buildFolder: './build',
    publicPath: config.publicPath,
    appVersion: packageFile.version,
    isProduction,
};

const webpackConfig = isProduction ?
    require('./webpack/webpack-prod.config')(configOptions) :
    require('./webpack/webpack-dev.config')(configOptions);

if (process.argv.indexOf('--json') === -1) {
    // eslint-disable-next-line no-console
    console.log('\n', ' ❤ isProduction:', isProduction, '\n');
}

module.exports = webpackConfig;
