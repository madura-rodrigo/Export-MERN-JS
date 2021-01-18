import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import CountrySelect from "./../CountryRegionSelect";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { Fragment } from "react";
import { Button, FormControl, FormGroup } from "@material-ui/core/";
import MuiPhoneNumber from "material-ui-phone-number";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

const Register = () => {
  const classes = useStyles();
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

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, ["phone"]: value });
  };

  const handleCountryChange = (value) => {
    setFormData({ ...formData, ["country"]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    rootStore.userStore.registerUser(formData);
  };

  if (rootStore.userStore.user.isAuthenticated === true) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="xl">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Retype Password"
              type="password"
              id="password2"
              onChange={(e) => onChange(e)}
            />
            <FormGroup row={true}>
              <CountrySelect
                name="country"
                id="country"
                value={country}
                required
                autoComplete={false}
                onChange={handleCountryChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="area"
                label="Area"
                name="area"
                value={area}
                style={({ width: 300 }, { marginLeft: theme.spacing(8) })}
                onChange={(e) => onChange(e)}
              />
            </FormGroup>
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="address"
              label="Address"
              id="address"
              fullWidth
              value={address}
              onChange={(e) => onChange(e)}
            />
            <FormGroup row>
              <MuiPhoneNumber
                variant="outlined"
                label="Phone"
                margin="normal"
                name="phone"
                style={{ width: 300 }}
                required
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="postalCode"
                label="postal Code"
                id="postalCode"
                style={({ width: 300 }, { marginLeft: theme.spacing(8) })}
                value={postalCode}
                onChange={(e) => onChange(e)}
              />
            </FormGroup>
            <FormControl margin="normal">
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </FormControl>
          </form>
        </div>
      </Container>
    </Fragment>
  );
};
export default observer(Register);
