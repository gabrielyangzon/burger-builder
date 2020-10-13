import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  authenticate: "",
  error: "",
  userId: "",
  token: "",
  loading: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_USER_START:
      return updateObject(state, {
        error: null,
        loading: false,
      });
    case actionTypes.AUTHENTICATE_USER_SUCCESS: {
      return updateObject(state, {
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null,
      });
    }
    case actionTypes.AUTHENTICATE_USER_FAILED: {
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    }
    case actionTypes.AUTH_LOGOUT: {
      return updateObject(state, { token: null, userId: null });
    }
    case actionTypes.SET_AUTH_REDIRECT_PATH: {
      return updateObject(state, { authRedirectPath: action.path });
    }
    default:
      return state;
  }
};

export default reducer;
