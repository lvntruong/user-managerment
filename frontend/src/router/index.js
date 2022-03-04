import React, { useEffect } from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import PublicRoute from "./publicRouter";

export default function Router() {
  const { isLoggedIn } = useSelector(selectAuth);
  const location = useLocation();

  useEffect(() => {
    console.log("isLoggedIn : ", isLoggedIn);
  }, [isLoggedIn]);

  if (isLoggedIn === false)
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Switch location={location} key={location.pathname}>
          <PublicRoute
            path="/"
            component={LoginPage}
            render={() => <Redirect to="/login" />}
          />
          <PublicRoute component={LoginPage} path="/login" exact />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/notfound" />}
          />
        </Switch>
      </Layout>
    );
  //   else
  // return (
  //   <Layout style={{ minHeight: "100vh" }}>
  //     <Navigation />
  //     <Layout style={{ minHeight: "100vh" }}>
  //       <AppRouter />
  //     </Layout>
  //   </Layout>
  // );
}
