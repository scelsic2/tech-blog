// from instructor's example: - https://github.com/jdtdesigns/basic_mvc_auth_example
const router = require("express").Router();
// const { engine } = require('express-handlebars');
const BlogPost = require("../models/BlogPost");
const User = require("../models/User");
const Comment = require("../models/Comment");
const moment = require('moment');
const formattedDate = moment().format('MMMM Do YYYY, h:mm a')

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

router.get('/dashboard', isAuthenticated, async (req, res) => {
  // Get the user by their id that is stored to the session
  const user = await User.findByPk(req.session.user_id);

  // Render the dashboard view and share the user's email address
  // so we can output it in the hbs html
 
  res.render('/dashboard', {
    email: user.email
  });
});

// Handle blog submission
router.post("/dashboard", isAuthenticated, async (req, res) => {
  try {
    // Get the user making the post
    const user = await User.findOne({
      where: { id: req.session.id }
    });

console.log(req.session.id)

    // Validate input
    if (!user) {
      throw new Error("User not found");
    } else if (!req.body.text) {
      throw new Error("A post is required");
    }

    // Create the new post
    //const formattedDatePost= moment().format('MMMM Do YYYY, h:mm a');
    const post = await BlogPost.create({
      title: req.body.title,
      userName: user.userName,
      text: req.body.text
      //,updatedAt: formattedDatePost, 
    });

    // Redirect to the dashboard
    res.redirect(`/dashboard`);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Handle comment submission
router.post("/posts/:id", isAuthenticated, async (req, res) => {
  try {
    // Get the blog post
    const post = await BlogPost.findByPk(req.params.id);

    console.log(' is this undefined? ', req.session.user_id);

    // Get the user making the comment
    const user = await User.findOne({
      where: { id: req.session.user_id }
    });

    // Validate input
    if (!user) {
      throw new Error("User not found");
    } else if (!req.body.comment_text) {
      throw new Error("A comment is required");
    }

    // Create the new comment
    const formattedDateComment = moment().format('MMMM Do YYYY, h:mm a');
    const comment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: user.id,
      post_id: post.id,
      updatedAt: formattedDateComment, 
    });

    // Redirect to the blog post
    res.redirect(`/posts/${post.id}`);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;