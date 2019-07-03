import {applyMiddleware, combineReducers, createStore} from 'redux';
import {logger} from 'redux-logger';
import authReducer from './reducers/authReducer';
import {routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import LoginSaga from './sagas/LoginSaga';
import SearchSaga from "./sagas/SearchSaga";
import searchReducer from "./reducers/searchReducer";

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  authReducer,
  searchReducer,
  routing: routerReducer,
}, {});

export default createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(LoginSaga);
sagaMiddleware.run(SearchSaga);

export const storeFactory = (initialState) => createStore(
  reducers, initialState, applyMiddleware(logger, sagaMiddleware)
);
