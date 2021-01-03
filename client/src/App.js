import "./App.css";
import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Categories from "./components/layout/Categories";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Suscribe from "./components/layout/Suscribe";
import Login from "./components/auth/Login";

function App() {
  return (
    <Fragment>
      <div className="main-content-wrapper d-flex clearfix">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Categories} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
      <Suscribe />
      <Footer />
    </Fragment>
  );
}

export default App;
