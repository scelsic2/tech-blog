const router = require('express').Router();
// const { engine } = require('express-handlebars');
const BlogPost = require('../models/BlogPost');

// https://www.youtube.com/watch?v=hKYjSgyCd60
router.get('/', async (req, res) => {
  if(!req.secure.viewCount){
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1
  }
  
  
  const posts = await BlogPost.findAll({
    raw: true
  }) 
  
  res.render("index", {
    blogPost: posts,
  })

});

router.get('/private/dashboard', async (req, res) => {
  res.render("private/dashboard")

});

router.get('/auth/login', async (req, res) => {
  res.render("auth/login")

});

module.exports = router;