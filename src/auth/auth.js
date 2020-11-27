const passport = require('passport');
const jwtSecret = require('../../jwtConfig');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcrypt');

//Create a passport middleware to handle user registration
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ where: { email } });
        if (user) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }
        const hash = await bcrypt.hash(password, 10);
        const createdUser = await UserModel.create({
          password: hash,
          email: email,
        });
        return done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ where: { email: email } });
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }

        const hashedPassword = bcrypt.hashSync(password, user.password);
        if (user.password === hashedPassword) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect credentials.' });
      } catch (error) {
        done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: jwtSecret.secret,
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
