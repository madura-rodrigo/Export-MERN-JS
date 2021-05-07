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
import Dashboard from "./components/layout/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profile from "./components/layout/Profile";
import EditCategory from "./components/layout/EditCategory";

function App() {
  return (
    <StoreContextProvider>
      <Router>
        <Fragment>
          <Dashboard />
          <div className="main-content-wrapper d-flex clearfix">
            <Header />
            <Route exact path="/" component={Categories}></Route>
            <PrivateRoute path="/editCategory" component={EditCategory} />
            <div className="single-product-area section-padding-100 clearfix container-fluid">
              <AlertComponent />
              <Switch>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/profile" component={Profile} />
              </Switch>
            </div>
          </div>
          <Suscribe />
          <Footer />
        </Fragment>
      </Router>
    </StoreContextProvider>
  );
}

export default App;
