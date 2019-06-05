import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Button, Form, Message} from 'semantic-ui-react'
import {login} from "../util/Auth";
import {LOGIN} from "../actions/types";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      password: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderError(){
    if (!this.state.error) return (<div></div>);
    return (
      <Message
        error
        header='Action Forbidden'
        content={this.state.error}
      />
    );
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const {user, password} = this.state;

    // login.call(this, this.state.user, this.state.password);
    this.props.onLogin(user, password);
  }

  render(){
    return (
      <Form
        error
        onSubmit={this.handleSubmit}
      >
        <Form.Input label='User Name' name='user' onChange={this.handleChange}/>
        <Form.Input label='Password' name='password' type='password' onChange={this.handleChange}/>
        <Button type='submit' primary>Log in</Button>
        {this.renderError()}
      </Form>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, password) => {
      dispatch({
        type: LOGIN,
        payload: {
          user,
          password,
        }});
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
