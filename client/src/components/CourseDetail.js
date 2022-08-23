/**
 * Purpose: component that retrieves the detail for courses from the Rest API and allows use to delete course button;
 * update course is also in this component
 */


import axios from "axios"; //fetch data from api (proj 9)
import React, { Component } from "react";
import { Link } from "react-router-dom"; //renders an accessible element with a real href
import ReactMarkdown from "react-markdown"; //to safely render React elements
import { getAuthorizationHeader, isAuthorizedUser } from "../utils/functions"; //importing function from utils

//deciding to do class components, will come back to refactor into hooks
export default class CourseDetail extends Component {
  state = {
    courseDetails: null
  };

  componentDidMount() { //component first reloads to make an axios call pulling a specific course based on the id
    const { id } = this.props?.match?.params;
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        this.setState({
          courseDetails: res.data.course
        });
      })
      .catch((error) => console.log(error)); //error stack
  }

//function to delete course based on specific course
  handleDeleteCourse = () => {
    const { id } = this.props?.match?.params;
    const loggedInUser = this.props.loggedInUser;

    const auth = getAuthorizationHeader(loggedInUser);
    axios //deleting within the api
      .delete(`/courses/${id}`, auth)
      .then(() => this.props.history.push("/"))
      .catch((error) => console.log(error)); //error stack
  };

  render() {
    const { courseDetails } = this.state;
    const { id } = this.props?.match?.params;
    const { title, description, estimatedTime, materialsNeeded, Student } =
      courseDetails || {};

      //renders course details and any updates or deletes
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {isAuthorizedUser(
              this.props.loggedInUser,
              courseDetails?.userId
            ) && (
              <>
                <Link
                  to={{
                    pathname: `/courses/${id}/update`,
                    state: courseDetails
                  }}
                  className="button"
                >
                  Update Course
                </Link>
                <Link
                  to={this.props?.location?.pathname}
                  className="button"
                  onClick={this.handleDeleteCourse}
                >
                  Delete Course
                </Link>
              </>
            )}
            <Link to="/" className="button button-secondary">
              Return to List
            </Link>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>
                  By {Student?.firstName} {Student?.lastName}
                </p>

                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

/**
 * sources: https://www.youtube.com/watch?v=Mm6_DlO5vvs (file structure)
 * https://www.xenonstack.com/insights/reactjs-project-structure
 */
