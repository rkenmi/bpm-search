import React, {Component} from 'react';
import Login from "./Login";
import {setAuthToken} from "../actions/authActions";
import {connect} from "react-redux";
import {Container, Grid} from 'semantic-ui-react'
import MenuExampleLabeledIconsVertical from './Menu';
import store from "../stores";

class Main extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
