/**
 * import components from components file (currently empty)
 */

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import CourseDetail from './components/Courses';
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import Header from './components/Header'
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';


function App() {
  return
    <Router>
      <div className = "App">
        <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={ Courses } />
            <PrivateRoute exact path="/authenticated" component={AuthWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );

}




/**
 * Testing to see if API and Client are talking to each other
 * fetch('http://localhost:5000/api/courses/1')
    .then(response => response.json())
    .then(data => console.log(data));
 */

export default App;


/**
 * Sources:
 * https://teamtreehouse.com/library/introducing-the-challenge#downloads
 */

