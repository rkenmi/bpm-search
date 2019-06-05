import {call, put, takeEvery} from 'redux-saga/effects';
import {login} from "../util/Auth";
import {AUTH, DEV_URL} from "../config/Api";
import axios from 'axios';
import {setAuthToken} from "../actions/authActions";

export function InvalidCredentialsException(message) {
  this.message = message;
  this.name = 'InvalidCredentialsException';
}

function* _login(action) {
  const {username, password} = action.payload;
  yield call(login, username, password);

  const res = yield call([axios, axios.post], DEV_URL + AUTH, {
      username,
      password
    });

  if (res.status === 200) {
    yield put(setAuthToken(res.data.key));
  }
}

function* LoginSaga(username, password) {
  yield takeEvery("LOGIN", _login);
}

export default LoginSaga;
