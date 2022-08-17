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

//import CourseDetail from './components/CoursesDetail';
import Courses from './components/Courses';
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

 function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Courses } />
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

