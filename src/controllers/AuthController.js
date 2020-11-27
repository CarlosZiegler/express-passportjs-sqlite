const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../jwtConfig');

module.exports = {
  // Create new User account
  async store(req, res, next) {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },

  // Login user with email and password
  async index(req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An Error occurred');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };

          const token = jwt.sign({ user: body }, jwtSecret.secret);

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
};
