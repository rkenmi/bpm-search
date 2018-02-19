import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import '../css/App.css';
import { Container, Grid } from 'semantic-ui-react'
import MenuExampleLabeledIconsVertical from './Menu';
import Login from './Login';
import { connect } from 'react-redux';
import { setSong, setAuthToken} from "../actions/authActions";

class App extends Component {

  _renderLogin() {
    if (!this.props.auth.authorized) {
      return (
        <Login/>
      );
    } else {
      return (
        <p>Hey, you're logged in!</p>
      );
    }
  }

  render() {
    let loginUrl = `/api`;
    return (
      <span>
        <Grid>
          <Grid.Row>
              <Grid.Column width={3}>
                <MenuExampleLabeledIconsVertical/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Container text>
                  <h1>CarZ</h1>
                  <span className="App">
                    {this._renderLogin()}
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
    auth: state.authReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => {
      dispatch(setAuthToken(token));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

