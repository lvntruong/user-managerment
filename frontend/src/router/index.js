import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import Company from "../pages/Company";
import PublicRoute from "./publicRouter";
import PrivateRoute from "./privateRouter";
import Navigation from "../components/Navigation";
import Person from "../pages/Person";
import HeaderContent from "../components/Header";
import storeLocal from "../utils/storeLocal";

export default function Router() {
  const location = useLocation();

  if (!storeLocal.get("token"))
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
  else
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Navigation />
        <Layout style={{ minHeight: "100vh" }}>
          <HeaderContent />
          <Switch location={location} key={location.pathname}>
            <PrivateRoute path="/" component={Company} exact />
            <PrivateRoute component={Person} path="/person" exact />
            <PublicRoute path="/login" render={() => <Redirect to="/" />} />
            <Route
              path="*"
              component={NotFound}
              render={() => <Redirect to="/notfound" />}
            />
          </Switch>
        </Layout>
      </Layout>
    );
}
