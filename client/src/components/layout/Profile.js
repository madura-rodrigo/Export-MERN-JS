import React from "react";
import { observer } from "mobx-react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Avatar, Container, Divider, Grid, TextField } from "@material-ui/core";

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
    rootStore.userStore.registerUser(user);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={5}>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                margin="normal"
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
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => onChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={3}>
              <Paper
                elevation={0}
                className={classes.paper2}
                variant="outlined"
              >
                <Avatar
                  alt={rootStore.userStore.name}
                  className={classes.avatar}
                  src={rootStore.userStore.avatar}
                />
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default observer(Profile);
