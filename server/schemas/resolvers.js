const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const Resolvers = {
  Query: {
    myself: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    AddUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      console.log({ token, user });

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    DeleteBooks: async (parent, { BookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { SavedBooks: { BookId: BookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    SavedBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { SavedBooks: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }
    },
  },
};

module.exports = Resolvers;
