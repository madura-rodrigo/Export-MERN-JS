import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContextProvider";
import { useContext } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const rootStore = useContext(StoreContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !rootStore.userStore.user.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default observer(PrivateRoute);
