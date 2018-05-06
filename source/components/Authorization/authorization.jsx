import React from 'react';
import * as authToken from '../../services/authToken';
import history from '../../history';
import config from '../../config';

/**
 *
 * @param authToken {object}
 * @param authToken.isAuthorized {function}
 * @param history {object}
 * @param config {object}
 * @returns {function(*): WithAuthorization}
 */
export const authorizationComponentFactory = (authToken, history, config) => {
    return (WrappedComponent) => {
        class WithAuthorization extends React.PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    allowed: true,
                };
            }

            componentWillMount() {
                this.checkAuthorization();
            }

            checkAuthorization() {
                const allowed = authToken.isAuthorized();
                if (!allowed) {
                    const { publicPath } = config;
                    history.push(`${publicPath}/login`);
                }
                this.setState({
                    allowed,
                });
            }

            render() {
                if (this.state.allowed) {
                    return (
                        <WrappedComponent {...this.props} />
                    );
                }
                return null;
            }
        }

        return WithAuthorization;
    };
};

const authorization = authorizationComponentFactory(authToken, history, config);

export default authorization;
