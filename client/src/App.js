import "./App.css";
import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import StoreContextProvider from "./stores/StoreContextProvider";
import Register from "./components/auth/Register";
import Categories from "./components/layout/Categories";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Suscribe from "./components/layout/Suscribe";
import AlertComponent from "./components/layout/Alert";

function App() {
  return (
    <StoreContextProvider>
      <Fragment>
        <div className="main-content-wrapper d-flex clearfix">
          <Router>
            <Header />
            <Route exact path="/" component={Categories} />
            <div className="single-product-area section-padding-100 clearfix container-fluid">
              <AlertComponent />
              <Switch>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
        <Suscribe />
        <Footer />
      </Fragment>
    </StoreContextProvider>
  );
}

export default App;
