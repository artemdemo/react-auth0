import * as authConst from './authConstants';

export function logout() {
    return {
        type: authConst.LOGOUT,
    };
}

export function logoutError(error = true) {
    return {
        type: authConst.LOGOUT_ERROR,
        error,
    };
}


export function startAuthRenewal() {
    return {
        type: authConst.START_AUTH_RENEWAL,
    };
}
