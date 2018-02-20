import React, {Component} from 'react';
import '../css/App.css';
import {Container, Grid} from 'semantic-ui-react'
import MenuExampleLabeledIconsVertical from './Menu';
import {connect} from 'react-redux';
import {setAuthToken} from "../actions/authActions";
import store from "../stores";
import {Link, Route, Switch} from "react-router-dom";
import Main from "./Main";

export const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/login" component={Main}/>
    </Switch>
  </div>
);

