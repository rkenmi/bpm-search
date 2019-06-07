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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(LoginSaga);
