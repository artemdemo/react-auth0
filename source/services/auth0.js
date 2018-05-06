import * as auth0js from 'auth0-js';
import * as authToken from './authToken';
import { setDefaultHeaders } from './request';

let webAuth = null;
const authProps = {
    audience: null,
    redirectUri: null,
};

/**
 * Set default authorization headers
 */
export const setAuthHeadersFactory = (authToken, setDefaultHeaders) => {
    return () => {
        if (authToken.isAuthorized()) {
            const token = authToken.get();
            setDefaultHeaders('Authorization', `Bearer ${token.access}`);
        }
    };
};
export const setAuthHeaders = setAuthHeadersFactory(authToken, setDefaultHeaders);

/**
 * initiate factory
 */
export const initiateFactory = (auth0js) => {

    /**
     * Initiate auth0 authorization
     *
     * @param props {object}
     * @param props.domain {string}
     * @param props.clientID {string}
     * @param props.redirectUri {string}
     * @param props.audience {string}
     * @param props.responseType {string}
     * @param props.scope {string}
     */
    return (props) => {
        const {
            domain,
            clientID,
            redirectUri,
            audience,
            responseType,
            scope,
        } = props;

        console.log(props);

        authProps.audience = audience;
        authProps.redirectUri = redirectUri;

        webAuth = new auth0js.WebAuth({
            domain,
            clientID,
            redirectUri,
            audience,
            responseType,
            scope,
        });

        setAuthHeaders();
    };
};

export const initiate = initiateFactory(auth0js);

/**
 * Kick in authorization with auth0.
 */
export const authorize = () => {
    if (!webAuth) {
        throw new Error('Initialize auth0 before calling to authorize()');
    }
    webAuth.authorize();
};

const getTokenFromResult = (result) => {
    const expiresAt = (result.expiresIn * 1000) + Date.now();
    return new authToken.AuthenticationToken(
        result.idToken,
        result.accessToken,
        expiresAt,
    );
};

/**
 * Parse hash with token
 * @param hashString
 * @returns {Promise<AuthenticationToken>}
 */
export const parseHash = hashString => new Promise((resolve, reject) => {
    webAuth.parseHash(hashString, (err, result) => {
        if (err) {
            return reject(err);
        }

        // If there is no hash or hash is not valid function will not reject.
        // I assume that user just opened application.
        // Authentication check will be handled in the next view.
        if (hashString === '' || !hashString.startsWith('#access_token')) {
            return resolve();
        }
        if (result && result.idToken && result.accessToken) {
            const token = getTokenFromResult(result);
            authToken.remove();
            authToken.store(token);
            setAuthHeaders();
            window.location.hash = '';
            return resolve(token);
        }
        return reject();
    });
});

export const renewAuthFactory = (webAuth, authToken) => {

    /**
     * Renew authorization token
     * @param options {object}
     * @returns {Promise<any>}
     */
    return (options = {}) => new Promise((resolve, reject) => {
        // I'm wrapping it in Promise, since it's easier to test, then bluebird.promisify
        // And both `authError`, `result` could contain an error
        const _options = Object.assign({}, options);
        webAuth.checkSession(_options, (err, result) => {
            if (err || (result && result.error)) {
                return reject(err || result.error);
            }
            if (result && result.accessToken && result.idToken) {
                const token = getTokenFromResult(result);
                authToken.store(token);
                return resolve(token);
            }
            return reject(new Error('Ambiguous response from auth0'));
        });
    });
};
export const renewAuth = renewAuthFactory(webAuth, authToken);
