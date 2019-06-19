import React from 'react';
import '../css/App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import TrackSearch from './TrackSearch';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={TrackSearch}/>
      <Route path="/login" component={Main}/>
      <Route path="/search" component={TrackSearch}/>
    </div>
  </BrowserRouter>
);

export default App;
