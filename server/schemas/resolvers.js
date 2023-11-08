const { GraphQLError } = require('graphql');
const { User, Workout, Exercise, Set } = require('../models');
const { signToken } = require('../utils/auth');
const AuthenticationError = new GraphQLError('Not logged in', {
  extentions: {
    code: 'UNAUTHENTICATED'
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

      return { user, token };
    }
  }
};

module.exports = resolvers;
