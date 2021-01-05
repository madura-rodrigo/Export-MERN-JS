import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const Navbar = (props) => {
  const userLogged = props.store.user.isAuthenticated;
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
            <Link to="/login" onClick={props.store.logout}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default observer(Navbar);
