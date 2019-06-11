import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './stores';
import App from "./containers/App";

const render = Component => {

  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  );
  registerServiceWorker();
};

store.subscribe(() => {
  console.log(store.getState())
});

render(App);
if (module.hot) {
  module.hot.accept();
  // module.hot.accept('./containers/App', () => { render(App) })
  // module.hot.accept('./containers/TrackSearch', () => { render(App) })
  // module.hot.accept('./containers/Login', () => { render(App) })
}
