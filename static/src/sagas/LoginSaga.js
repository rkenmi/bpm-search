import {call, put, takeEvery} from 'redux-saga/effects';
import {AUTH, DEV_URL} from "../config/Api";
import axios from 'axios';
import {loginFailure, setAuthToken} from "../actions/authActions";
import {LOGIN} from "../actions/types";

export function InvalidCredentialsException(message) {
  this.message = message;
  this.name = 'InvalidCredentialsException';
}

function* _login(action) {
  const {username, password} = action.payload;

  try {
    const res = yield call([axios, axios.post], DEV_URL + AUTH, {
      username,
      password
    });

    if (res.status === 200) {
      yield put(setAuthToken(res.data.key));
    }

    console.log(res);
  } catch (e) {
    console.error(e);
    yield put(loginFailure(e.response.statusText));
  }

}

function* LoginSaga(username, password) {
  yield takeEvery(LOGIN, _login);
}

export default LoginSaga;
