import React from 'react';
import { render } from 'react-dom';
import PromiseBluebird from 'bluebird';
import RouteProvider from './routes/RouteProvider';
import { publicPath } from './config';
import { requestConfigs } from './model/envConfigs/envConfigsSagas';
import { envConfigsLoaded, envConfigsLoadingError } from './model/envConfigs/envConfigsActions';
import { requestRoutes } from './model/routes/routesSagas';
import authorization from './components/Authorization/authorization';

import store from './store';
import history from './history';

PromiseBluebird.config({
    warnings: false,
    cancellation: true,
});

const loadComponent = componentName => new Promise((resolve) => {
    return import(
        /* webpackMode: "lazy" */
        /* webpackChunkName: "view/[request]" */
        `./views/${componentName}`
        )
        .then((response) => {
            resolve(response.default);
        });
});

requestConfigs()
    .then((configs) => {
        // I'm dispatching action via store,
        // since I want this configs to be in main application state.
        store.dispatch(envConfigsLoaded(configs));
    })
    .catch((err) => {
        store.dispatch(envConfigsLoadingError(err));
    });

render(
    <RouteProvider
        store={store}
        history={history}
        publicPath={publicPath}
        requestConfigs={requestConfigs}
        requestRoutes={requestRoutes}
        loadComponent={loadComponent}
        authorization={authorization}
    />,
    document.getElementById('app'),
);
