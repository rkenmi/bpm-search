import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import navbarInstance from './Navbar';

const render = Component => {
  ReactDOM.render(navbarInstance, document.getElementById('topnav'));
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
  registerServiceWorker();
};

render(App);

// Make components hot reloadable
if (module.hot) {
  module.hot.accept('./App', () => { render(App) })
  module.hot.accept('./Navbar', () => { render(App) })
}
