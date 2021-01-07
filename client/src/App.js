import "./App.css";
import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserStore from "./stores/store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Categories from "./components/layout/Categories";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Suscribe from "./components/layout/Suscribe";
import AlertComponent from "./components/layout/Alert";

const userStore = new UserStore();

function App() {
  return (
    <Fragment>
      <div className="main-content-wrapper d-flex clearfix">
        <Router>
          <Header store={userStore} />
          <Route exact path="/" component={Categories} />
          <div className="single-product-area section-padding-100 clearfix container-fluid">
            <AlertComponent store={userStore} />
            <Switch>
              <Route path="/register">
                <Register store={userStore} />
              </Route>
              <Route path="/login">
                <Login store={userStore} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
      <Suscribe />
      <Footer />
    </Fragment>
  );
}

export default App;
