// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // create jwt token
  const token = user.getJwtToken();

  res.status(statusCode).send({
    success: true,
    payload: { token, user },
  });
};

module.exports = sendToken;
