const express = require('express');
const passport = require('passport');
const AuthController = require('../controllers/AuthController');

const routes = express.Router();

/**
 * @swagger
 * /signup:
 *  post:
 *    description: create a user
 *
 */
routes.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  AuthController.store
);
/**
 * @swagger
 * /login:
 *  post:
 *    description: Sign in with email and password
 *
 */
routes.post(
  '/login',
  passport.authenticate('login', { session: false }),
  AuthController.index
);

module.exports = routes;
