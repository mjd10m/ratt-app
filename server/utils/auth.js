const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token
      .split(' ')
      .pop()
      .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid Token!');
    }

    return req;
  },

  signToken: function({ username }) {
    const payload = { username };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // signupToken: function(email) {
  //   const payload = {email}
  //   return jwt.sign({data:payload}, secret, {expiresIn: expiration})
  // },
  // checkSignupToken: function(token) {
  //   try {
  //     jwt.verify(token, secret)
  //     console.log("true")
  //     return true
  //   } catch (err) {
  //     console.log("false")
  //     return false
  //   }
  // }
};