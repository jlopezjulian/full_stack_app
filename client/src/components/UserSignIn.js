/**
 * purpose: component that provides a sign in screen
 *  -renders a sign in button
 *  -cancel button that returns the use to the default route (courses)
 */

//import components
//import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

//class component setting state to email address and password
export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: ""
  };

  //event handler for setting state to name input
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //event handler that fetches username data and saves
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { emailAddress, password } = this.state;
    this.props.signIn(emailAddress, password);
  };
  //   axios
  //     .get("/users", {
  //       auth: {
  //         username: emailAddress,
  //         password
  //       }
  //     })
  //     .then((res) => {
  //       this.props.setLoggedInUser({
  //         user: {
  //           ...res.data
  //         },
  //         password
  //       });
  //       this.props.history.push("/");
  //     })
  //     .catch((error) => console.log(error));
  // };

//renders from sign in html
  render() {
    const { emailAddress, password } = this.state;
    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>

          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={this.handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
            <button className="button" type="submit">
              Sign In
            </button>
            <button
              className="button button-secondary"
              onClick={() => this.props.history.push("/")}
            >
              Cancel
            </button>
          </form>
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up!</Link>
          </p>
        </div>
      </main>
    );
  }
}
