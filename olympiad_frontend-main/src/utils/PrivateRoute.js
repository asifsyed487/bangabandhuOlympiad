import React from "react";
import { Redirect, Route } from "react-router-dom";
import checkAuth from "./checkAuth";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  Layout = Layout === undefined ? (props) => <>{props.children}</> : Layout;

  return (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() === true ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
