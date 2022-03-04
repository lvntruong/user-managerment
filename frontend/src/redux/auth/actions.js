import * as actionTypes from "./types";
import storeLocal from "../storeLocal";
import { createBrowserHistory } from "history";
import axios from "axios";
import { errorHandler, successHandler } from "../../request/handleReponse";
import { API_BASE_URL } from "../../config";

const history = createBrowserHistory();

const postLogin = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL + "/login", data);
    storeLocal.set("token", response.data.result.token);
    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

const postLogout = () => {
  storeLocal.clear();
};

export const login = (dataLogin) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_REQUEST,
    payload: { loading: true },
  });
  const data = await postLogin(dataLogin);

  if (data.success === true) {
    const authValue = {
      current: data.result.user,
      loading: false,
      isLoggedIn: true,
    };
    storeLocal.set("auth", authValue);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data.result.user,
    });
    history.push("/");
  } else {
    dispatch({
      type: actionTypes.FAILED_REQUEST,
      payload: data,
    });
  }
};

export const logout = () => async (dispatch) => {
  postLogout();
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  history.push("/login");
};
