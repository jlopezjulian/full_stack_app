/**
 * component that allows signed in user a "Create Course" button
 * when clicked to a Create Course page with create/cancel buttons
 */

import axios from "axios";
import React, { Component } from "react";
import { getAuthorizationHeader } from "../utils/functions"; //only signed in user can see this button

//create a CreateCourse component and adding empty state to necessary items
export default class CreateCourse extends Component {
  state = {
    courseTitle: "",
    courseDescription: "",
    estimatedTime: "",
    materialsNeeded: "",
    errorMessages: []
  };

  //when the user updates the input field, the name: value pair is updated
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //event handler used to submit form
  handleFormSubmit = (event) => {
    event.preventDefault();
    const loggedInUser = this.props.loggedInUser;
    const { courseTitle, courseDescription, estimatedTime, materialsNeeded } =
      this.state; //saves all data that is entered

    const auth = getAuthorizationHeader(loggedInUser);
    this.setState({
      errorMessages: []
    });

    axios //
      .post( //access courses and course details from API
        `/courses`,
        {
          title: courseTitle,
          description: courseDescription,
          estimatedTime,
          materialsNeeded
        },
        auth
      )
      .then(() => this.props.history.push("/")) //move from one page to another, need to read more information on useHistory hook if can be used instead
      .catch((error) => {
        const errors = error?.response?.data?.errors || [error.message];
        this.setState({
          errorMessages: errors
        });
      });
  };

  //referencing uncontrolled components here https://reactjs.org/docs/uncontrolled-components.html
  render() {
    const { firstName, lastName } = this.props.loggedInUser || {};
    const {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errorMessages
    } = this.state;


    //returning from create-course.html
    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
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
                  name="courseTitle"
                  type="text"
                  value={courseTitle}
                  onChange={this.handleOnChange}
                />

                <p>
                  By {firstName} {lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={courseDescription}
                  onChange={this.handleOnChange}
                ></textarea>
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
                  value={materialsNeeded}
                  onChange={this.handleOnChange}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Create Course
            </button>
            <button className="button button-secondary">Cancel</button>
          </form>
        </div>
      </main>
    );
  }
}
