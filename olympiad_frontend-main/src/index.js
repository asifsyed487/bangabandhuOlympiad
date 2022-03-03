import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { store } from "./redux/store";

import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

//import './App.css';
import "./assets/scss/style.scss";

import { Provider } from "react-redux";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
    <MessengerCustomerChat pageId="105577737709842" appId="3716721948360680" />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
