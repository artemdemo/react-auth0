import React from 'react';
import * as authToken from '../services/authToken';
import * as auth0 from '../services/auth0';
import { requestConfigs } from '../model/envConfigs/envConfigsSagas';
import config from '../config';
import history from '../history';

export const loginViewFactory = (authToken, auth0, requestConfigs, config, history) => {
    /**
     * `auth0.authorize` is not always working fast.
     * Therefore I need placeholder to show to user before
     */
    return class LoginView extends React.PureComponent {
        componentDidMount() {
            const { publicPath } = config;
            if (authToken.isAuthorized()) {
                history.push(`${publicPath}/`);
            } else {
                requestConfigs()
                    .then(() => {
                        auth0.authorize();
                    });
            }
        }

        render() {
            return (
                <div className='login-view' />
            );
        }
    };
};

export default loginViewFactory(authToken, auth0, requestConfigs, config, history);
