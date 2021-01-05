import React from "react";
import { Alert } from "react-bootstrap";
import { observer } from "mobx-react";

function AlertComp(props) {
  const err = props.store.user.error;
  if (err.type) {
    return (
      <div>
        <Alert variant={err.type} dismissible></Alert>
      </div>
    );
  }
}

export default observer(AlertComp);
