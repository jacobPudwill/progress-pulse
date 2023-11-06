const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // If token was taken from headers, last value is the token. ex: ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    // Token does not exist
    if (!token) {
      return req;
    }
    // Verification returns decoded payload if valid
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  signToken: function ({ username, password, _id }) {
    const payload = { username, password, _id };
    // jwt.sign(payload, secret/Key, [options, callback])
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
