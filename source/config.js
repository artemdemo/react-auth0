const configDev = {
    publicPath: '',
};

const configProd = {
    publicPath: '',
};

/**
 * We need to support both environments - node.js and browser
 */
try {
    global.ENV = Object.assign(global.ENV || {}, {
        production: process.env.NODE_ENV,
    });
} catch (e) {}

const config = ENV.production ? Object.assign(configDev, configProd) : configDev;

module.exports = config;
