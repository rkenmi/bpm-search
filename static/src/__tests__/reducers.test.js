import {loginFailure, setAuthToken} from "../actions/authActions";
import authReducer from "../reducers/authReducer";
import {filteredBPMResponse, getGenresResponse} from "../actions/searchActions";
import searchReducer from "../reducers/searchReducer";

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

describe('search reducer', () => {
  const state = {
    results: [],
    page: 0,
    totalPages: 0,
    queryResponseMs: 0,
    allGenres: [],
  };

  let action = filteredBPMResponse([1, 2, 3], 1, 1000);
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
