import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApplicationContext } from "../../application.context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useApplicationContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = state.isLoggedIn;
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
