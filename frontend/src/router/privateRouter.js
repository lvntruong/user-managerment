import React from "react";
import { Route, Redirect } from "react-router-dom";
import storeLocal from "../utils/storeLocal";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        storeLocal.get("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
