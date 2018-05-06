import request from 'superagent-bluebird-promise';
import _isObject from 'lodash/isObject';

const defaultHeaders = {};

export const setDefaultHeaders = (field, value) => {
    if (_isObject(field)) {
        for (const key in field) {
            defaultHeaders[key] = field[key];
        }
    } else {
        defaultHeaders[field] = value;
    }
};

export const requestFactory = function(request) {
    const applyHeaders = (requestObj) => {
        for (const key in defaultHeaders) {
            requestObj.set(key, defaultHeaders[key]);
        }
        return requestObj;
    };
    return {
        get(url) {
            const requestObj = request
                .get(url);
            return applyHeaders(requestObj);
        },

        post(url) {
            const requestObj = request
                .post(url);
            return applyHeaders(requestObj);
        },

        put(url) {
            const requestObj = request
                .put(url);
            return applyHeaders(requestObj);
        },

        delete(url) {
            const requestObj = request
                .delete(url);
            return applyHeaders(requestObj);
        },
    };
};

export default requestFactory(request);
