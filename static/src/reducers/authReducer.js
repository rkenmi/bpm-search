const initialState = {
  results: '',
  authorized: false,
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case "SET_AUTH_TOKEN":
      state = {
        ...state,
        results: action.payload,
        authorized: true,
      };
      break;
  }

  return state;
};

export default authReducer
