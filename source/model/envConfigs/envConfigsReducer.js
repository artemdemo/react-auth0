import * as envConfigsConst from './envConfigsConstants';

const initialState = {
    data: {},
    error: null,
};

export default function envConfigsReducer(state = initialState, action) {
    switch (action.type) {
        case envConfigsConst.ENV_CONFIGS_LOADED:
            return Object.assign({}, state, {
                data: Object.assign({}, action.data),
            });
        case envConfigsConst.LOADING_ENV_CONFIGS_ERROR:
            return Object.assign({}, state, {
                error: action.error,
            });
        default:
            return state;
    }
}
