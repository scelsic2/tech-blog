const router = require('express').Router();
// const { engine } = require('express-handlebars');
const BlogPost = require('../models/BlogPost');

router.get('/', async (req, res) => {
  const posts = await BlogPost.findAll({
    raw: true
  }) 
  

  res.render("index", {
    blogPost: posts,
  })

});

router.get('/dashboard', async (req, res) => {
  res.render("dashboard")

});

router.get('/login', async (req, res) => {
  res.render("login")

});

module.exports = router;