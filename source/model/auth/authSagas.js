import { take, fork, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as authConst from './authConstants';
import {
    logout,
    logoutError,
} from './authActions';
import * as auth0 from '../../services/auth0';
import * as authToken from '../../services/authToken';
import config from '../../config';

export function logoutSagaFactory(authToken, config, historyPromise) {
    return function* logoutSaga() {
        const { publicPath } = config;
        while (true) {
            yield take(authConst.LOGOUT);
            try {
                const historyPackage = yield historyPromise;
                const history = historyPackage.default;
                authToken.remove();
                history.push(`${publicPath}/login`);
            } catch (err) {
                yield put(logoutError(err));
            }
        }
    };
}

let _renewTickRef;

export function renewTickSagaFactory(auth0) {
    return function* renewTickSaga(timeout) {
        while (true) {
            yield call(delay, timeout);
            try {
                yield auth0.renewAuth();
            } catch (err) {
                yield put(logout());
            }
        }
    };
}

export function authRenewSagaFactory(authToken, renewTickSaga) {
    return function* authRenewSaga() {
        while (true) {
            yield take(authConst.START_AUTH_RENEWAL);
            if (_renewTickRef) {
                _renewTickRef.cancel();
            }
            const token = authToken.get();
            const timeout = token.expiresAt - Date.now();
            _renewTickRef = yield fork(renewTickSaga, timeout);
        }
    };
}

export default function* authSagas() {
    yield [
        // Direct access to the `history` file is not available at this point
        // This is because this file loaded via `store.js` initialization
        // and `history.js` depends on `store.js`
        // Therefore we need to load `history.js` asynchronously
        logoutSagaFactory(authToken, config, import('../../history'))(),
        authRenewSagaFactory(
            authToken,
            renewTickSagaFactory(auth0),
        )(),
    ];
}
