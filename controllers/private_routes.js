// from instructor's example: - https://github.com/jdtdesigns/basic_mvc_auth_example

const router = require('express').Router();
const User = require('../models/User');

/**
* Custom middleware function that checks if a user
* is authenticated - check that their user id is stored to req.session.user_id
*/
function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  // If they're authenticated, we move on to the next route callback
  next();
}

router.get('/private/dashboard', isAuthenticated, async (req, res) => {
  // Get the user by their id that is stored to the session
  const user = await User.findByPk(req.session.user_id);

  // Render the dashboard view and share the user's email address
  // so we can output it in the hbs html
  res.render('/dashboard', {
    email: user.email
  });
});

module.exports = router;