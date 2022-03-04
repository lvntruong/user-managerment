import { notification } from "antd";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const errorHandler = (error, emptyResult = null) => {
  const { response } = error;

  if (!response) {
    return {
      success: false,
      result: emptyResult,
      message: "Cannot connect to the server, Check your internet network",
    };
  } else if (response && response.status) {
    const message = response.data && response.data.message;
    const errorText = message;
    const { status } = response;
    notification.config({
      duration: 3,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    if (error.response.data.jwtExpired) {
      history.push("/logout");
    }
    return response.data;
  } else {
    notification.config({
      duration: 3,
    });
    notification.error({
      message: "Unknown Error",
      description: "An unknown error occurred in the app, please try again. ",
    });
    return {
      success: false,
      result: emptyResult,
      message: "An unknown error occurred in the app, please try again. ",
    };
  }
};

const successHandler = (response, typeNotification = {}) => {
  if (!response.data.result) {
    response = {
      ...response,
      status: 404,
      url: null,
      data: {
        success: false,
        result: null,
      },
    };
  }
  const { data } = response;
  if (data.success === false) {
    const message = data && data.message;
    const errorText = message;
    const { status } = response;
    notification.config({
      duration: 3,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
  }

  return data;
};

export { errorHandler, successHandler };
