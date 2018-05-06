import React from 'react';
import { connect } from 'react-redux';
import * as auth0 from '../services/auth0';
import config from '../config';
import history from '../history';

export const callbackViewFactory = (auth0, config, history) => {
    return class CallbackView extends React.PureComponent {
        componentDidMount() {
            const { routing } = this.props;
            const { publicPath } = config;

            auth0.parseHash(routing.locationBeforeTransitions.hash)
                .then(() => {
                    history.push(`${publicPath}/`);
                })
                .catch(() => {
                    history.push(`${publicPath}/login`);
                });
        }

        render() {
            return null;
        }
    };
};

export default connect(
    state => ({
        routing: state.routing,
    })
)(callbackViewFactory(auth0, config, history));
