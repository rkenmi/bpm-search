import React, {Component} from 'react';
import Login from "./Login";
import {setAuthToken} from "../actions/authActions";
import {connect} from "react-redux";
import {Container, Form, Grid, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import HorizontalMenu, {LinksNav} from "../components/HorizontalMenu";

class Main extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  _render() {
    if (!this.props.auth.authorized) {
      return (
        <Login/>
      );
    } else if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <p>Blank page</p>
      );
    }
  }

  render() {
    return (
      <Container>
        <Segment basic>
          <LinksNav/>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
              </Grid.Column>
              <Grid.Column width={10}>
                <Container text>
                  <h1>Page</h1>
                  <span className="App">
                      {this._render()}
                    </span>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
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
