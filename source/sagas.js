import authSagas from './model/auth/authSagas';

export default function* rootSaga() {
    yield [
        authSagas(),
    ];
}
