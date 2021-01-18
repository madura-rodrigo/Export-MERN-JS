import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { Button, Col, Form } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const Register = () => {
  const rootStore = useContext(StoreContext);
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
  });

  const {
    firstName,
    lastName,
    email,
    country,
    area,
    address,
    phone,
    postalCode,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    rootStore.userStore.registerUser(formData);
  };

  if (rootStore.userStore.user.isAuthenticated === true) {
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
            countryValueType="short"
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
      <div className="section-padding-50-0">
        <Button className="btn amado-btn mb-15" variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
};
export default observer(Register);
