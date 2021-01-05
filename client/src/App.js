import "./App.css";
import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Store from "./store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Categories from "./components/layout/Categories";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Suscribe from "./components/layout/Suscribe";
import AlertComp from "./components/layout/Alert";

const userStore = new Store();

function App() {
  return (
    <Fragment>
      <div className="main-content-wrapper d-flex clearfix">
        <Router>
          <Header store={userStore} />
          <Switch>
            <AlertComp store={userStore}></AlertComp>
            <Route exact path="/" component={Categories} />
            <Route path="/register" component={Register} />
            <Route path="/login">
              <Login store={userStore} />
            </Route>
          </Switch>
        </Router>
      </div>
      <Suscribe />
      <Footer />
    </Fragment>
  );
}

export default App;
