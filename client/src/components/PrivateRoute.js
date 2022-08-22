import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ loggedInUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedInUser ? (
        <Component {...props} loggedInUser={loggedInUser} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

export default PrivateRoute;
