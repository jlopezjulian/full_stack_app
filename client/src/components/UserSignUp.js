/**
 * Purpose:
 * Component that provides Sign up screen:
 * -create new account
 * -sign up button using /api/users route
 * -renders a cancel button that leads to list of course (default)
 */

import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

//class component to add empty state
export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    successMsg: "",
    errorMessages: []
  };

  //event listener to update name pair value
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

//event listener that allows form to be submitted with success msg or error msg
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { successMsg, ...rest } = this.state;

    this.setState({
      errorMessages: [],
      //successMsg: ""
    });

    axios
      .post("/users", {
        ...rest
      })
      .then(() => {
        const { emailAddress, password } = this.state;
        this.props.signIn(emailAddress, password);
      })
      .catch((error) => {
        const errors = error?.response?.data?.errors || [error.message];
        this.setState({
          errorMessages: errors
        });
      });
  };

  render() {
    const { firstName, lastName, emailAddress, password, errorMessages } =
      this.state;
    return (
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          {errorMessages.length > 0 && (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errorMessages.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </ul>
            </div>
          )}
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={this.handleInputChange}
            />
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
              Sign Up
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => this.props.history.push("/")}
            >
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="/signin">sign in!</Link>
          </p>
        </div>
      </main>
    );
  }
}
