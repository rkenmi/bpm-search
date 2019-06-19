import {LOGIN_FAILURE, SET_AUTH_TOKEN} from "../actions/types";

const initialState = {
  token: null,
  authorized: false,
  error: null,
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_AUTH_TOKEN:
      state = {
        ...state,
        token: action.payload,
        authorized: true,
      };
      break;

    case LOGIN_FAILURE:
      state = {
        ...state,
        error: action.error
      };
      break;

    default:
      break;
  }

  return state;
};

export default authReducer
