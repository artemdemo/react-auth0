import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const combinedReducers = combineReducers({
    routing: routerReducer,
});

export default combinedReducers;
