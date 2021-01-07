import React from "react";
import { Alert } from "react-bootstrap";
import { observer } from "mobx-react";
import { Fragment } from "react";

const AlertComponent = (props) =>
  props.store.user.errors !== null &&
  props.store.user.errors.length > 0 &&
  props.store.user.errors.map((alert) => {
    setTimeout(() => props.store.clearError(alert.id), 5000);

    return (
      <Fragment>
        <Alert variant={alert.type}>{alert.msg}</Alert>
      </Fragment>
    );
  });

export default observer(AlertComponent);
