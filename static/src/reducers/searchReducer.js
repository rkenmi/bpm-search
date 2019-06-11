import {FILTER_RESPONSE, LOGIN_FAILURE, SET_AUTH_TOKEN} from "../actions/types";

const initialState = {
  results: []
};

const searchReducer = (state=initialState, action) => {
  switch(action.type) {
    case FILTER_RESPONSE:
      state = {
        ...state,
        results: action.results,
      };
      break;

    default:
      break;
  }

  return state;
};

export default searchReducer
