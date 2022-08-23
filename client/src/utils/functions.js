/**
 * purpose: adding a specific file to hold helper functions that will be used in components
 */

//getAuthorizationHeader is used to return email address and password
export const getAuthorizationHeader = (loggedInUser) => {
  const { emailAddress, password } = loggedInUser;
  return {
    auth: {
      username: emailAddress,
      password
    }
  };
};
//isAuthorizedUser has to have loggedInUser AND courseOwnerID
export const isAuthorizedUser = (loggedInUser, courseOwnerId) => {
  return loggedInUser && courseOwnerId === loggedInUser.id;
};


/**
 * sources: react folder structure https://www.robinwieruch.de/react-folder-structure/
 * utils for helper functions
 */