import React, {Component} from 'react';
import Login from "./Login";
import {setAuthToken} from "../actions/authActions";
import {connect} from "react-redux";
import {Container, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import HorizontalMenu from "../components/HorizontalMenu";

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
        <HorizontalMenu
          entries={[
            {name: 'home', text: 'Home', link: '/', onClick: () => {}},
            {name: 'login', text: 'Login', link: '/login', onClick: () => {}},
            {name: 'about', text: 'About', link: '/about', onClick: () => {}},
          ]}
        />
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
