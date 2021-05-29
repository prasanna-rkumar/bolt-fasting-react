import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';


const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <></>;
  }
  if (!user) {
    return <Route {...rest} render={(props) => (
      <Component {...rest} {...props} />
    )} />
  }
  return <Redirect to="/dashboard" />
}

export default UnProtectedRoute;