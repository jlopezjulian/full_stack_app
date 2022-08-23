/**
 * Purpose of component: retrieves the list of courses from the REST API DB
 */

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";//renders an accessible element with a real href

export default class Courses extends React.Component {
  state = {
    courses: [] //setting an empty state to courses array
  };

  componentDidMount() {
    axios
      .get("/courses") //fetching courses from database
      .then((res) => { //setting a state to it
        this.setState({
          courses: res.data.courses
        });
      })
      .catch((error) => console.log(error)); //error stack
  }
//rendering courses as default page (lines pulled from index.html)
  render() {
    const { courses } = this.state;
    const { loggedInUser } = this.props; //passing the props over whenever loggedInUser is stated
    return (
      <main>
        <div className="wrap main--grid">
          {courses?.map((course) => {
            return (
              <Link
                to={`/courses/${course.id}`}
                key={course.id}
                className="course--module course--link"
              >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            );
          })}
          {loggedInUser && (
            <Link
              to="/courses/create"
              className="course--module course--add--module"
            >
              <span className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </span>
            </Link>
          )}
        </div>
      </main>
    );
  }
}

/**
 * sources: https://reactjs.org/docs/components-and-props.html
 */