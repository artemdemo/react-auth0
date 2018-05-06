import request from 'superagent-bluebird-promise';
import config from '../../config';

let routesPromise = null;

export const requestRoutesFactory = (request, config) => {
    return (routingMap = '') => {
        if (!routesPromise) {
            routesPromise = request
                .get(`${config.publicPath}/api/routes/${routingMap}`)
                .promise()
                .then(routesResult => routesResult.body);
        }
        return routesPromise;
    };
};

export const requestRoutes = requestRoutesFactory(request, config);
