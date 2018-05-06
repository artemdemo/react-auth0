export const AUTH_ID_TOKEN = 'AUTH_ID_TOKEN';
export const AUTH_ACCESS_TOKEN = 'AUTH_ACCESS_TOKEN';
export const AUTH_ACCESS_TOKEN_EXPIRATION_TIME = 'AUTH_ACCESS_TOKEN_EXPIRATION_TIME';

/**
 * Token constructor class
 */
export class AuthenticationToken {
    constructor(id, access, expiresAt) {
        this.id = id;
        this.access = access;
        this.expiresAt = expiresAt;
    }
}

/**
 * Save token to local storage
 * @param token {AuthenticationToken}
 */
export const store = (token) => {
    const { id, access, expiresAt } = token;
    localStorage.setItem(AUTH_ID_TOKEN, id);
    localStorage.setItem(AUTH_ACCESS_TOKEN, access);
    localStorage.setItem(AUTH_ACCESS_TOKEN_EXPIRATION_TIME, expiresAt);
};

/**
 * Get stored token
 * @returns {AuthenticationToken}
 */
export const get = () => {
    const token = new AuthenticationToken(
        localStorage.getItem(AUTH_ID_TOKEN),
        localStorage.getItem(AUTH_ACCESS_TOKEN),
        Number(localStorage.getItem(AUTH_ACCESS_TOKEN_EXPIRATION_TIME)),
    );

    if (token.id == null || token.access == null || token.expiresAt == null) {
        return null;
    }

    return token;
};

/**
 * Remove stored token
 */
export const remove = () => {
    localStorage.removeItem(AUTH_ID_TOKEN);
    localStorage.removeItem(AUTH_ACCESS_TOKEN);
    localStorage.removeItem(AUTH_ACCESS_TOKEN_EXPIRATION_TIME);
};

/**
 * Check whether user is authorized or not
 * @returns {Boolean}
 */
export const isAuthorized = () => {
    const hasSavedToken = get() !== null;
    if (!hasSavedToken) {
        return false;
    }
    const { expiresAt } = get();
    const now = Date.now();
    return now < expiresAt;
};
