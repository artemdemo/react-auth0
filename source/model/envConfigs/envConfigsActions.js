import * as envConfigsConst from './envConfigsConstants';

/*
 * There is no loadEnvConfigs()
 * Action will be dispatched directly through the store in saga
 */

export function envConfigsLoaded(data) {
    return {
        type: envConfigsConst.ENV_CONFIGS_LOADED,
        data,
    };
}

export function envConfigsLoadingError(error = true) {
    return {
        type: envConfigsConst.LOADING_ENV_CONFIGS_ERROR,
        error,
    };
}
