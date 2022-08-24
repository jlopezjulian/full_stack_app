/**
 * purpose: stateless component
 * authenticated user and redirects the user to the default route (i.e. the list of courses)
 */

import { Component }from "react";

export default class UserSignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }
  render() {
    return null;
  }
}


//