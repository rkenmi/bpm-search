import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import axios from 'axios'
import {setAuthToken} from "../actions/authActions";
import store from "../stores";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Login extends Component {
  apiBaseUrl = "http://localhost:8000/api/";

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
    // console.log(this.state);
  }

  handleSubmit(e){
    e.preventDefault();
    let payload = {
      username: this.state.user,
      password: this.state.password
    };
    axios.post(this.apiBaseUrl+'login/', payload)
      .then(res => {
        console.log(res);
        this.setState({
        });
        store.dispatch(setAuthToken(res.data.key));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: 'Invalid login'
        });
        throw err;
      });
    console.log(payload);
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


export default Login;
