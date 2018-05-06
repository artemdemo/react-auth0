const config = require('../config');

const { publicPath } = config;

/**
 * Routing definition
 */
const routes = [
    {
        path: `${publicPath}/`,
        _component: 'AppView',
        _checkAuth: false,
        indexRoute: {
            _component: 'MainView',
        },
        childRoutes: [
            {
                path: 'second',
                _component: 'SecondView',
            },
            {
                path: 'third',
                _component: 'ThirdView',
            },
            {
                path: 'login',
                _component: 'LoginView',
                _checkAuth: false,
            },
            {
                path: 'callback',
                _component: 'CallbackView',
                _checkAuth: false,
            },
        ],
    },
    {
        path: '/',
        _redirect: true,
    },
    {
        path: '*',
        _component: 'AppView',
        _checkAuth: false,
        indexRoute: {
            _component: 'RouteNotFoundView',
        },
    },
];


module.exports = {
    routes,
};
