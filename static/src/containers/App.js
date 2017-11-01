import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import '../css/App.css';
import { Container, Grid } from 'semantic-ui-react'
import MenuExampleLabeledIconsVertical from './Menu';
import Login from './Login';
import { connect } from 'react-redux';
import {setSong} from "../actions/songActions";

class App extends Component {
  render() {
    let loginUrl = `/api`;
    return (
      <span>
        <p>{this.props.song.results}</p>
        <Grid>
          <Grid.Row>
              <Grid.Column width={3}>
                <MenuExampleLabeledIconsVertical/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Container text>
                  <h1>CarZ</h1>
                  <span className="App">
                    <Login/>
                  </span>
                </Container>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    song: state.songReducer,
    math: state.mathReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSong: (song) => {
      dispatch(setSong(song));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

