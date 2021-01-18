import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { observer } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertComponent = () => {
  const classes = useStyles();
  const rootStore = useContext(StoreContext);
  let returnValue = null;
  rootStore.alertStore.alerts !== null &&
    rootStore.alertStore.alerts.length > 0 &&
    rootStore.alertStore.alerts.map((alert) => {
      setTimeout(() => rootStore.alertStore.clearError(alert.id), 5000);

      return (returnValue = (
        <Fade in={alert} timeout={{ enter: 700, exit: 700 }}>
          <div className={classes.root}>
            <Alert variant="filled" severity={alert.type}>
              {alert.msg}
            </Alert>
          </div>
        </Fade>
      ));
    });
  return returnValue;
};
export default observer(AlertComponent);
