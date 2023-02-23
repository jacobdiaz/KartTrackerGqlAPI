// Resolvers are querys or mutations that we can make to our database.
const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    user: (_, { ID }) => User.findById(ID), // another way to query a user
  },
  Mutation: {
    async registerUser(_, { registerInput: { email, password } }) {
      // See if an old user exists with email attempting to be registered to register
      const userExsists = await User.findOne({ email });
      // Throw an error if it exsists
      if (userExsists)
        throw new ApolloError("User account already exsists", "ACCOUNT_EXISTS");

      // Encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      // Create our JWT token (attach to user model)
      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "2h",
      });

      // Save user to database
      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc, // gets all properties of the object
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      // See if user exsists & passwords match
      const foundUser = await User.findOne({ email });
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);

      // Check if entered password = encrypted password
      if (foundUser && passwordsMatch) {
        // Create our JWT token
        const token = jwt.sign(
          { user_id: foundUser._id, email },
          "UNSAFE_STRING",
          {
            expiresIn: "2h",
          }
        );

        // Attach token to user model
        foundUser.token = token;

        return {
          id: foundUser.id,
          ...foundUser._doc,
        };
      } else {
        // User doesn't exsists
        return new ApolloError("Invalid credentials", "INCORRECT_CREDENTIALS");
      }
    },
  },
};
