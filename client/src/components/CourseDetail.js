import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getAuthorizationHeader, isAuthorizedUser } from "../utils/functions";

export default class CourseDetail extends Component {
  state = {
    courseDetails: null
  };

  componentDidMount() {
    const { id } = this.props?.match?.params;
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        this.setState({
          courseDetails: res.data.course
        });
      })
      .catch((error) => console.log(error));
  }

  handleDeleteCourse = () => {
    const { id } = this.props?.match?.params;
    const loggedInUser = this.props.loggedInUser;

    const auth = getAuthorizationHeader(loggedInUser);
    axios
      .delete(`/courses/${id}`, auth)
      .then(() => this.props.history.push("/"))
      .catch((error) => console.log(error));
  };

  render() {
    const { courseDetails } = this.state;
    const { id } = this.props?.match?.params;
    const { title, description, estimatedTime, materialsNeeded, Student } =
      courseDetails || {};

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
