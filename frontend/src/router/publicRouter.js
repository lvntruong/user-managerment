import React from "react";
import { Route, Redirect } from "react-router-dom";
import storeLocal from "../utils/storeLocal";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        storeLocal.get("token") ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
