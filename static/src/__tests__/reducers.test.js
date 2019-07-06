import {loginFailure, setAuthToken} from "../actions/authActions";
import authReducer from "../reducers/authReducer";
import {filteredBPMResponse, getGenresResponse} from "../actions/searchActions";
import searchReducer from "../reducers/searchReducer";
import deepFreeze from 'deep-freeze';

describe('auth reducer', () => {
 it('saves error message from login', () => {
   const state = {
     token: null,
     authorized: false,
     error: null,
   };
   const action = loginFailure('test error msg');
   deepFreeze(state);
   deepFreeze(action);

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
    deepFreeze(state);
    deepFreeze(action);

    const result = authReducer(state, action);
    expect(result.token).toEqual('test token');
  })
});

describe('search reducer', () => {
  const state = {
    results: [],
    page: 0,
    totalPages: 0,
    queryResponseMs: 0,
    allGenres: [],
  };

  let action = filteredBPMResponse([1, 2, 3], 1, 1000);
  deepFreeze(state);
  deepFreeze(action);

  let result = searchReducer({...state}, action);

  it('returns filtered search results', () => {
    expect(result.results).toEqual([1, 2, 3]);
  });

  it('returns the correct number of total pages', () => {
    expect(result.totalPages).toEqual(1);
  });

  it('returns the time taken for the query response', () => {
    expect(result.queryResponseMs).toEqual(1000);
  });

  action = getGenresResponse(['Punk', 'Harmonica']);
  result = searchReducer({...result}, action);

  it('returns the available genres that are selectable for filtering', () => {
    expect(result.allGenres).toEqual(['Punk', 'Harmonica']);
  });

});
