import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
