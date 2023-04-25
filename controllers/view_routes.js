const router = require("express").Router();
// const { engine } = require('express-handlebars');
const BlogPost = require("../models/BlogPost");
const User = require("../models/User");
const Comment = require("../models/Comment");
const moment = require('moment');
const formattedDate = moment().format('MMMM Do YYYY, h:mm a')

// https://www.youtube.com/watch?v=hKYjSgyCd60
router.get("/", async (req, res) => {
  if (!req.secure.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }

 const posts = await BlogPost.findAll({
    raw: true, 
  });

  res.render("index", {
    blogPost: posts,
  });
});

router.get("/dashboard", async (req, res) => {
  if (!req.secure.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }

  if (req.session.user_id == null) {
    res.redirect("/");
    return;
  }

  let posts;
  if (req.session.userEmail) {
    posts = await BlogPost.findAll({
      raw: true,
      where: {
        userName: req.session.userEmail,
      },
    });
  } else {
    posts = await BlogPost.findAll({
      raw: true,
    });
  }

  res.render("dashboard", {
    blogPost: posts,
  });
});

// Get one post
router.get("/posts/:id", async (req, res) => {
  const post = await BlogPost.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
  });

  const postComments = await Comment.findAll({ 
    where: { 
      post_id: req.params.id 
    }, 
    raw: true
  });

  const users = await User.findAll({
    where: {
      id: postComments.map((comment) => { 
        return comment.user_id 
      })
    }
  })

postComments.map((comment) => {
  comment.user_email = users.map((user) => {
    if(comment.user_id == user.id) {
      return user.email;
    }
  })
});

  if (post) {
    const formattedDate = moment(post.updatedAt).format('MMMM Do YYYY, h:mm a');
    res.render("posts", {
      title: post.title,
      userName: post.userName,
      text: post.text,
      updatedAt: formattedDate, 
      comment: postComments
    });
  } else {
    res.status(404).send("Blog post not found");
  }
});

// Handle form submission
router.post("/posts/:id", async (req, res) => {
  try {
    // Get the blog post
    const post = await BlogPost.findByPk(req.params.id);

    // Get the user making the comment
    const user = await User.findOne({
      where: { email: req.body.email }
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

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async(req, res) => {
  res.render("register");
});

router.get("/logout", async(req, res) => {
  res.render("logout");
});

module.exports = router;
