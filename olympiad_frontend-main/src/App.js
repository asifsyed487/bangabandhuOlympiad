import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

import { routes, private_routes, adminroutes } from "./utils/routes";
import PrivateRoute from "./utils/PrivateRoute";
import Maintainance from "../src/views/Maintaince";
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    trackPage(page);
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          {routes.map((item, i) => (
            <AppRoute
              key={i}
              exact={item.exact}
              path={item.path}
              component={item.component}
              layout={item.layout}
            />
          ))}

          {private_routes.map((item, i) => (
            <PrivateRoute
              key={i}
              exact={item.exact}
              path={item.path}
              component={item.component}
              layout={item.layout}
            />
          ))}
        </Switch>
      )}
    />
  );
};

export default App;
