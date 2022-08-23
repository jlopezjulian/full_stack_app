/**
stateless component that:
  -displays the top menu bar
  -shows sign in and sign up buttons
  -shows name of authenticated user
 */


import React from "react";
import { Link, withRouter } from "react-router-dom";



function Header(props) {
  const { loggedInUser, handleLogout, location } = props; //extra details from props
  const { firstName, lastName } = loggedInUser || {};

  //render a welcome message (if authenicated user) and a sign out link
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
