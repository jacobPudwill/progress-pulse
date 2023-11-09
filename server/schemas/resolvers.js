const { GraphQLError } = require('graphql');
const { User, Workout, Exercise, Set } = require('../models');
const { signToken } = require('../utils/auth');

const AuthenticationError = new GraphQLError('Not logged in', {
  extentions: {
    code: 'UNAUTHENTICATED'
  }
});
const LoginError = new GraphQLError('Incorrect username or password', {
  extensions: {
    code: 'LOGIN_ERROR'
  }
});

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw AuthenticationError;
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({username});

      if (!user) {
        throw LoginError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw LoginError;
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
