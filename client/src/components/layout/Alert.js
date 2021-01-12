import React from "react";
import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { Fragment } from "react";

const AlertComponent = () => {
  const rootStore = useContext(StoreContext);
  let returnValue = null;
  rootStore.alertStore.alerts !== null &&
    rootStore.alertStore.alerts.length > 0 &&
    rootStore.alertStore.alerts.map((alert) => {
      setTimeout(() => rootStore.alertStore.clearError(alert.id), 5000);

      return (returnValue = (
        <Fragment>
          <Alert variant={alert.type}>{alert.msg}</Alert>
        </Fragment>
      ));
    });
  return returnValue;
};
export default observer(AlertComponent);
