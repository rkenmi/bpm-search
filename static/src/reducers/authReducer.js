const initialState = {
  token: null,
  authorized: false,
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case "SET_AUTH_TOKEN":
      state = {
        ...state,
        token: action.payload,
        authorized: true,
      };
      break;
  }

  return state;
};

export default authReducer
