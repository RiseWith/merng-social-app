const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

require("dotenv").config();

module.exports = (context) => {
  // context = { ...headers }
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Token is invalid/expired");
      }
    }

    throw new Error("Authentication token not found");
  }

  throw new Error("Authorization header not found");
}