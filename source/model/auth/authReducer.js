import * as authConst from './authConstants';

const initialState = {
    loggingOut: false,
    loggingOutError: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authConst.LOGOUT:
            return Object.assign({}, state, {
                loggingOut: true,
            });
        case authConst.LOGOUT_ERROR:
            return Object.assign({}, state, {
                loggingOut: false,
                loggingOutError: action.error,
            });
        default:
            return state;
    }
}
