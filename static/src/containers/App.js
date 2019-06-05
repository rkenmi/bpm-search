import React, {Component} from 'react';
import '../css/App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Main from "./Main";

// const history = syncHistoryWithStore(browserHistory, store);
const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Main}/>
      <Route path="/foobar" component={Foobar}/>
    </div>
  </BrowserRouter>
);

class Foobar extends Component {
  render() {
    return (
      <div>
        <Main>
          <p>Mr. fo0 b4r</p>
        </Main>
      </div>
    );
  }
}

export default App;
