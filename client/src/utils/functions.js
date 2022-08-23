export const getAuthorizationHeader = (loggedInUser) => {
  const { emailAddress, password } = loggedInUser;
  return {
    auth: {
      username: emailAddress,
      password
    }
  };
};

export const isAuthorizedUser = (loggedInUser, courseOwnerId) => {
  return loggedInUser && courseOwnerId === loggedInUser.id;
};
