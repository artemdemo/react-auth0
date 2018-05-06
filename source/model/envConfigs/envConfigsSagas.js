import request from 'superagent-bluebird-promise';

import config from '../../config';
import store from '../../store';

let configsPromise = null;

export const requestConfigsFactory = (request, store, config, forcePromise = false) => {
    return () => {
        // I don't need to memoize promise in tests,
        // therefore I'm using `forcePromise` variable
        if (forcePromise === true || !configsPromise) {
            configsPromise = request
                .get(`${config.publicPath}/api/envConfig`)
                .promise()
                .then(configResult => configResult.body);
        }
        return configsPromise;
    };
};

export const requestConfigs = requestConfigsFactory(request, store, config);
