import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: ""
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { emailAddress, password } = this.state;
    axios
      .get("/users", {
        auth: {
          username: emailAddress,
          password
        }
      })
      .then((res) => {
        this.props.setLoggedInUser({
          user: {
            ...res.data
          },
          password
        });
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

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
