const router = require("express").Router();
// const { engine } = require('express-handlebars');
const BlogPost = require("../models/BlogPost");

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

function getPost() {
  router.get("/post/:id", async (req, res) => {
    const postId = req.params.id;

    if (postId) {
      const post = await BlogPost.findOne({
        raw: true,
        where: {
          id: postId,
        },
      });
      res.render("post", {
        blogPost: post,
      });
    } else {
      res.send("Blog post cannot be found.");
    }
  });
}

router.get("/posts/:id", async (req, res) => {
  const post = await BlogPost.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
  });

  if (post) {
    res.render("posts", {
      title: post.title,
      userName: post.userName,
      text: post.text,
    });
  } else {
    res.status(404).send("Blog post not found");
  }
});

router.get("/private/dashboard", async (req, res) => {
  res.render("private/dashboard");
});

router.get("/auth/login", async (req, res) => {
  res.render("auth/login");
});

module.exports = router;
