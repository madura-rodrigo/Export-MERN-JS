import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";
import Suscribe from "./Suscribe";

const Main = () => {
  return (
    <Router>
      <Fragment>
        <Fragment className="main-content-wrapper d-flex clearfix">
          <Route path="/" component={Header} />
          <Route path="/" component={Categories} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <Route path="/register" component={Register} />
          </Switch>
        </Fragment>
        <Suscribe />
        <Footer />
      </Fragment>
    </Router>
  );
};

export default Main;
