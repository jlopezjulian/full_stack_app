/**
 * import components from components file
 */

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import axios from "axios";


import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";


//bringing the signin() method and signOUt()method into global states (brought them from components)


class App extends Component {
  state = {
    loggedInUser: null
  };

  signIn = (emailAddress, password) => {
    axios
      .get("/users", {
        auth: {
          username: emailAddress,
          password
        }
      })
      .then((res) => {
        this.setState({
          loggedInUser: {
            ...res.data,
            password
          }
        });
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  signOut = () => {
    this.setState({
      loggedInUser: null
    });

    this.props.history.push("/");
  };


/**
 * routes to the components
 * / - Courses
 * /courses/create - CreateCourse
 * /courses/:id/update - UpdateCourse
 * /courses/:id - CourseDetail
 * /signin - UserSignIn
 * /signup - UserSignUp
 * /signout - UserSignOut
 *
 */
 render() {
  return (
    <>
      <Header loggedInUser={this.state.loggedInUser} />
      <Switch>
        <Route exact path="/" component={Courses} />
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
          render={(props) => <UserSignIn {...props} signIn={this.signIn} />}
        />
        <Route
          path="/signup"
          render={(props) => <UserSignUp {...props} signIn={this.signIn} />}
        />
        <Route
          path="/signout"
          render={(props) => (
            <UserSignOut {...props} signOut={this.signOut} />
          )}
        />
      </Switch>
    </>
  );
}
}

export default withRouter(App);


/**
 * Testing to see if API and Client are talking to each other
 * fetch('http://localhost:5000/api/courses/1')
    .then(response => response.json())
    .then(data => console.log(data));
 */

/**
 * Sources:
 * https://teamtreehouse.com/library/introducing-the-challenge#downloads
 * //https://stackoverflow.com/questions/31048953/what-are-these-three-dots-in-react-doing
 */
