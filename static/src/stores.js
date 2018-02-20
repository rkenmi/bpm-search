
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {logger} from 'redux-logger';
import authReducer from './reducers/authReducer';
import { routerReducer } from 'react-router-redux';

export default createStore(
  combineReducers({
    authReducer,
    routing: routerReducer,
  }, {}),
  applyMiddleware(logger)
);
