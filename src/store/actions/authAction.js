import * as actionTypes from "./actionTypes";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeOut = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const authenticateUser = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authenticateUserStart(email, password));
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let apiKey = "";
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        apiKey;
    }

    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(
          authenticateUserSuccess(response.data.localId, response.data.idToken)
        );
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authenticateUserFail(error.response.data.error));
      });
  };
};

export const authenticateUserStart = (email, password) => {
  return {
    type: actionTypes.AUTHENTICATE_USER_START,
    email: email,
    password: password,
  };
};

export const authenticateUserSuccess = (localId, idToken) => {
  return {
    type: actionTypes.AUTHENTICATE_USER_SUCCESS,
    userId: localId,
    token: idToken,
  };
};

export const authenticateUserFail = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_USER_FAILED,
    error: error,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authenticateUserSuccess(userId, token));
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
