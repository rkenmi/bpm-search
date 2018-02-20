import {AUTH, DEV_URL} from "../config/Api";
import store from "../stores";
import {setAuthToken} from "../actions/authActions";
import _ from 'lodash';
import axios from 'axios'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function InvalidCredentialsException(message) {
  this.message = message;
  this.name = 'InvalidCredentialsException';
}

export function login(username, password) {
  return axios
    .post(DEV_URL + AUTH, {
      username,
      password
    })
    .then((response) => {
      store.dispatch(setAuthToken(response.data.key));
    })
    .catch((error) => {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        this.setState({
          error: 'Invalid login'
        });
        throw new InvalidCredentialsException(error);
      }
      this.setState({
        error: 'Unknown login error'
      });
      throw error;
    });
}

export const isLoggedIn = () => {
  return store.getState().authReducer.token != null;
};

