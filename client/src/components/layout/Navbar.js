import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const Navbar = ({ store }) => {
  const userLogged = store.user.isAuthenticated;
  return (
    <nav className="amado-nav">
      <ul>
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="product-details">Product</Link>
        </li>
        <li>
          <Link to="cart">Cart</Link>
        </li>
        <li>
          <Link to="checkout">Checkout</Link>
        </li>
        <li>
          {!userLogged && <Link to="/login">Login</Link>}
          {userLogged && (
            <Link to="/login" onClick={store.logout}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default observer(Navbar);
