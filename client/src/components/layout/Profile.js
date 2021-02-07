import React from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "40ch",
    },
  },
  paper2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    width: "100%",
    height: "50%",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const rootStore = useContext(StoreContext);
  const [user, setUser] = useState(rootStore.userStore.user.user);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    rootStore.userStore.updateUser(user);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Box display="flex" m={1} p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1}>
              <Typography component="h1" variant="h5">
                {user.firstName} Profile
              </Typography>
            </Box>
            <Box p={1} alignSelf="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
          <Grid container spacing={5}>
            <Grid item xs={9}>
              <div>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) => onChange(e)}
                  autoFocus
                />
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <TextField
                variant="standard"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                disabled
              />
              <div>
                <TextField
                  variant="standard"
                  id="country"
                  label="Country"
                  name="country"
                  value={user.country}
                  disabled
                />
                <TextField
                  variant="standard"
                  required
                  id="area"
                  label="Area"
                  name="area"
                  value={user.area}
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  variant="standard"
                  required
                  id="address"
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div>
                <MuiPhoneNumber
                  variant="standard"
                  label="Phone"
                  name="phone"
                  required
                  id="phone"
                  value={user.phone}
                />
                <TextField
                  variant="standard"
                  required
                  name="postalCode"
                  label="postal Code"
                  id="postalCode"
                  value={user.postalCode}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Grid>
            <Grid item xs={3}>
              <Box
                display="flex"
                justifyContent="center"
                p={3}
                m={3}
                bgcolor="grey.300"
              >
                <Avatar
                  alt={rootStore.userStore.name}
                  className={classes.avatar}
                  src={user.avatar}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default observer(Profile);
