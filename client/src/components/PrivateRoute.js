/**
 * purpose:  HOC for configuring protected routes
 */


import { Redirect, Route } from "react-router-dom";

//function that renders the component associated with the private route if there's an authenticated user
const PrivateRoute = ({ loggedInUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedInUser ? (
        <Component {...props} loggedInUser={loggedInUser} />
      ) : (
        <Redirect to="/signin" /> //redirects the user to the /signin route if there's not an authenticated user.
      )
    }
  />
);

export default PrivateRoute;
