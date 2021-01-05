import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = (props) => {
  return (
    <Fragment>
      {/* Mobile Nav (max width 767px) */}
      <div className="mobile-nav">
        {/* Navbar Brand */}
        <div className="amado-navbar-brand">
          <a href="index.html">
            <img src={require("../../img/core-img/logo.png").default} alt="" />
          </a>
        </div>
        {/* Navbar Toggler */}
        <div className="amado-navbar-toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <header className="header-area clearfix">
        <div className="nav-close">
          <i className="fa fa-close" aria-hidden="true"></i>
        </div>
        <div className="logo">
          <Link to="/">
            <img
              src={require("../../img/core-img/logo.png").default}
              alt="Logo"
            />
          </Link>
        </div>
        <Navbar store={props.store} />
        {/*Button Group*/}
        <div className="amado-btn-group mt-30 mb-100">
          <a href="/some/valid/uri" className="btn amado-btn mb-15">
            %Discount%
          </a>
          <a href="/some/valid/uri" className="btn amado-btn active">
            New this week
          </a>
        </div>
        {/*Cart Menu*/}
        <div className="cart-fav-search mb-100">
          <a href="cart.html" className="cart-nav">
            <img src={require("../../img/core-img/cart.png").default} alt="" />{" "}
            Cart <span>(0)</span>
          </a>
          <a href="/some/valid/uri" className="fav-nav">
            <img
              src={require("../../img/core-img/favorites.png").default}
              alt=""
            />{" "}
            Favourite
          </a>
          <a href="/some/valid/uri" className="search-nav">
            <img
              src={require("../../img/core-img/search.png").default}
              alt=""
            />{" "}
            Search
          </a>
        </div>
        {/*Social Button*/}
        <div className="social-info d-flex justify-content-between">
          <a href="/some/valid/uri">
            <i className="fa fa-pinterest" aria-hidden="true"></i>
          </a>
          <a href="/some/valid/uri">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="/some/valid/uri">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="/some/valid/uri">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
