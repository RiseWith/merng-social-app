const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require('apollo-server');
require("dotenv").config();

const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // Validate User Input
      if (password !== confirmPassword) {
        throw new UserInputError("Passwords didn't match!");
      }
      // Check if the Username isn't already taken
      const user = await User.findOne({username});

      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "Username is already taken!"
          },
        });
      }

      // Hash password and generate an Auth Token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toDateString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
  },
};
