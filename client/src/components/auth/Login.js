import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { Link, Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const Login = () => {
  const rootStore = useContext(StoreContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    rootStore.userStore.authUser(user);
  };

  if (rootStore.userStore.user.isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
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
      <Button className="btn amado-btn mb-15" variant="primary" type="submit">
        Log In
      </Button>
      <Container className="link">
        <Row>
          <Col>
            <Link to="">Forgot password?</Link>
          </Col>
          <Col>
            <Link to="/register" className="">
              Don't have an account? Please Register...!
            </Link>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default observer(Login);
