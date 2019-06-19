import {FILTER_RESPONSE, GET_GENRES_RESPONSE, LOGIN_FAILURE, SET_AUTH_TOKEN} from "../actions/types";

const initialState = {
  results: [],
  page: 0,
  totalPages: 0,
  queryResponseMs: 0,
  allGenres: [],
};

const searchReducer = (state=initialState, action) => {
  switch(action.type) {
    case FILTER_RESPONSE:
      state = {
        ...state,
        results: action.results,
        totalPages: action.totalPages,
        queryResponseMs: action.timeDiffMs,
      };
      break;

    case GET_GENRES_RESPONSE:
      state = {
        ...state,
        allGenres: action.results
      };
      break;

    default:
      break;
  }

  return state;
};

export default searchReducer
