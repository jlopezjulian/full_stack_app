/**
 * Purpose of component: retrieves the list of courses from the REST API DB
 */

import { Component } from "react";
import { Link } from 'react-router-dom';



export default class Courses extends Component {
    state = {
        courses: [] //setting an empty state to courses array
    };

    componentDidMount(){
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(apiData => {this.setState({courses: apiData})})
            };


          // then populate the DOM with the fetched data
        render() {
            const courseResults = this.state.courses;
            const courseList = courseResults.map((course) => {
              return (
                <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                  <span className="course--add--title"></span>
                      <h2 className="course--label">Course</h2>
                      <h3 className="course--title"> {course.title} </h3>
                  <span className="course--add--title"></span>
                </Link>
             )
          });
      //pulled from index html (lines 45-49)
          return (
            <main>
              <div className="wrap main--grid">
              {courseList}
                <Link to="/courses/create" className="course--module course--add--module">
                  <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                  </span>
                  </Link>
              </div>
            </main>
        )};
      };

