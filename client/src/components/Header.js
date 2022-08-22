/**
 * Header component renders at the top menu bar and buttons for signing up and signing in
 */

//import components
import React from "react";
import { Link, withRouter } from "react-router-dom";

//functional Header that displays name of user at the top
function Header(props) {
  const { loggedInUser, handleLogout, location } = props;
  const { firstName, lastName } = loggedInUser || {};
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {loggedInUser ? (
            <ul className="header--signedin">
              <li>
                Welcome, {firstName} {lastName}
              </li>
              <li>
                <Link to={location?.pathname} onClick={handleLogout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default withRouter(Header);
