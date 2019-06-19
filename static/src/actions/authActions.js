import {LOGIN_FAILURE, SET_AUTH_TOKEN} from "./types";

export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    error: err,
  }
};

export const setAuthToken = (token) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: token,
  }
};
