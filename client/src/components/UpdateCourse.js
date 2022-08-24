/**
 * Purpose:
 * UpdateCourse renders a form that allows a user to update one of existing courses
 * -renders "Update Course" button to api/courses/:id
 * -renders a "Cancel" button that returns user to Course Detail screen
 */

import axios from "axios";
import React, { Component } from "react";
import { getAuthorizationHeader } from "../utils/functions";

//class component that checks course details with ternary operators and assign an empty state to each input
//need to return to refactor this
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining (prevent nesting chaos)

export default class UpdateCourse extends Component {
  state = {
    title: this.props?.location?.state?.title
      ? this.props?.location?.state?.title //attempted to refactor to just have empty state but unsure how to hold the location
      : "",
    description: this.props?.location?.state?.description
      ? this.props?.location?.state?.description
      : "",
    estimatedTime: this.props?.location?.state?.estimatedTime
      ? this.props?.location?.state?.estimatedTime
      : "",
    materialsNeeded: this.props?.location?.state?.materialsNeeded
      ? this.props?.location?.state?.materialsNeeded
      : "",
    Student: this.props?.location?.state?.Student
      ? this.props?.location?.state?.Student
      : null,
    errorMessages: []
  };


  //event handler that sets state to name value pair
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

    //event handler that submits updated form
  handleFormSubmit = (event) => {
    event.preventDefault();
    const id = this.props?.location?.state?.id;
    const loggedInUser = this.props.loggedInUser;

    const auth = getAuthorizationHeader(loggedInUser);

    const { errorMessages, ...rest } = this.state;

    this.setState({
      errorMessages: []
    });

    axios
      .put( //put is used to update courses
        `/courses/${id}`,
    //console.log("hello")
        {
          ...rest //title, description, estimateTime, materials needed, student
        },
        auth
      )
      .then(() => this.props.history.push(`/courses/${id}`)) //default page
      .catch((error) => {
        const errors = error?.response?.data?.errors || [error.message];
        this.setState({
          errorMessages: errors
        });
      });
  };

    //renders from update-course.html
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      Student,
      errorMessages
    } = this.state;

    const { location } = this.props;

    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
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
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.handleOnChange}
                />

                <p>By {Student?.emailAddress}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="description"
                  value={description}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={this.handleOnChange}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  onChange={this.handleOnChange}
                  value={materialsNeeded}
                />
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() =>
                this.props.history.push(`/courses/${location?.state?.id}`)
              }
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }
}
  /**
   * sources: https://www.youtube.com/watch?v=K7rHYyf6E0g
   */