import {loginFailure, setAuthToken} from "../actions/authActions";
import authReducer from "../reducers/authReducer";

describe('auth reducer', () => {
 it('saves error message from login', () => {
   const state = {
     token: null,
     authorized: false,
     error: null,
   };
   const action = loginFailure('test error msg');

   const result = authReducer(state, action);
   expect(result.error).toEqual('test error msg');
 });

  it('saves auth token from login', () => {
    const state = {
      token: null,
      authorized: false,
      error: null,
    };
    const action = setAuthToken('test token');

    const result = authReducer(state, action);
    expect(result.token).toEqual('test token');
  })
});
