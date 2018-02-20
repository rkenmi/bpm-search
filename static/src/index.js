import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import {App} from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './stores';
import {BrowserRouter} from "react-router-dom";

const render = Component => {

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root'),
);
  registerServiceWorker();
};

store.subscribe(() => {
  console.log(store.getState())
});

store.dispatch({
  type: "ADD",
  payload: 30
});


store.dispatch({
  type: "SUBTRACT",
  payload: 12
});

store.dispatch({
  type: "NEW_SONG",
  payload: "Meteora"
});

render(App);
if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) })
  module.hot.accept('./containers/Login', () => { render(App) })
}
