import {applyMiddleware, combineReducers, createStore} from 'redux';
import {logger} from 'redux-logger';
import authReducer from './reducers/authReducer';
import {routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import LoginSaga from './sagas/LoginSaga';

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  combineReducers({
    authReducer,
    routing: routerReducer,
  }, {}),
  applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(LoginSaga);
