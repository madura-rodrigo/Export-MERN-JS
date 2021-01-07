import React, { Component } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import { Link, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    country: "",
    area: "",
    address: "",
    phone: "",
    postalCode: "",
    company: "",
    category: "",
  });

  const [sellerRegistration, setSellerRegistration] = useState(false);

  const [showSellerRegistration, setShowSellerRegistration] = useState(false);

  const {
    firstName,
    lastName,
    email,
    country,
    area,
    address,
    phone,
    postalCode,
    company,
    category,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //props.store.regiserUser(formData);
  };

  if (props.store.user.isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={lastName}
          required
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
          value={email}
          required
          onChange={(e) => onChange(e)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Retype Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          placeholder="Retype Password"
          required
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Country</Form.Label>
          <CountryDropdown
            className="browser-default custom-select"
            name="country"
            value={country}
            valueType="short"
            onChange={(v, e) => {
              if (v === "LK") {
                setSellerRegistration(true);
              } else {
                setSellerRegistration(false);
                setShowSellerRegistration(false);
                setFormData({ ...formData, company: "", category: "" });
              }

              onChange(e);
            }}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Area</Form.Label>
          <RegionDropdown
            className="browser-default custom-select"
            name="area"
            country={country}
            value={area}
            onChange={(v, e) => onChange(e)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={address}
          required
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Tel</Form.Label>
          <PhoneInput
            inputProps={{ name: "phone", required: true }}
            value={phone}
            onChange={(v, c, e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={postalCode}
            required
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
      </Form.Row>
      {sellerRegistration && (
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="I would like to register as a seller"
            onClick={(e) => {
              if (e.target.checked) {
                setShowSellerRegistration(true);
              } else {
                setShowSellerRegistration(false);
                setFormData({ ...formData, company: "", category: "" });
              }
            }}
          />
        </Form.Group>
      )}
      {showSellerRegistration && (
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={company}
            required
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
      )}
      {showSellerRegistration && (
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            defaultValue="Choose..."
            required
            onChange={(e) => onChange(e)}
          >
            <option>Choose...</option>
            <option>Gems</option>
            <option>Hand Crafts</option>
          </Form.Control>
        </Form.Group>
      )}
      <div className="section-padding-50-0">
        <Button className="btn amado-btn mb-15" variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
};
export default observer(Register);
