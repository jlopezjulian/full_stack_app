/**
 * import components from components file (currently empty)
 */

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";

//import CourseDetail from './components/CoursesDetail';
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";
// import CreateCourse from './components/CreateCourse';
// import Header from './components/Header';
// import UpdateCourse from './components/UpdateCourse';
// import UserSignIn from './components/UserSignIn';
// import UserSignUp from './components/UserSignUp';

/**
 * adding HOC components to Context here
 *
 *
 *
 *
 */

/**
 * function App holds the routes to components including a catch all error route in line 47
 *
 */

export default class App extends Component {
  state = {
    loggedInUser: null
  };

  setLoggedInUser = ({ user, password }) => {
    this.setState({
      loggedInUser: {
        ...user,
        password
      }
    });
  };

  handleLogout = () => {
    this.setState({
      loggedInUser: null
    });
    window.location.href = "/signin";
  };

  render() {
    return (
      <Router>
        <Header
          loggedInUser={this.state.loggedInUser}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Courses {...props} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCourse}
            loggedInUser={this.state.loggedInUser}
          />
          <Route
            exact
            path="/courses/:id"
            render={(props) => (
              <CourseDetail {...props} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourse}
            loggedInUser={this.state.loggedInUser}
          />

          <Route
            path="/signin"
            render={(props) => (
              <UserSignIn {...props} setLoggedInUser={this.setLoggedInUser} />
            )}
          />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </Router>
    );
  }
}

/**
 * Testing to see if API and Client are talking to each other
 * fetch('http://localhost:5000/api/courses/1')
    .then(response => response.json())
    .then(data => console.log(data));
 */

/**
 * Sources:
 * https://teamtreehouse.com/library/introducing-the-challenge#downloads
 */
