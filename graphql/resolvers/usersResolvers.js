const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require('apollo-server');
require("dotenv").config();

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");


const generateToken = (user) => {
  return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      )
}

module.exports = {
  Mutation: {
    async login(parent, {username, password}) {
      // Validate User Input
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Validation errors", { errors });
      }

      // Check if user exists
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // Check if password matches
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      // Creating a JWT token
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // Validate User Input
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError("Validation errors", { errors });
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

      // Creating a JWT token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
  },
};
