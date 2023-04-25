const User = require("../models/User")
const Comment = require("../models/Comment")
const db = require('./connection');
const BlogPost = require('../models/BlogPost');

db.sync({ force: true }).then(() => {
  BlogPost.bulkCreate([
    {
      title: "How I Learned to Code in 12 Weeks",
      userName: "scelsic2@gmail.com",
      text: "After 14 years, I left my career to go back to school... again!"
    },
    {
      title: "Flexboxes - Why aren't They More Flexible?",
      userName: "carmato@gmail.com",
      text: "You'd think with a name like flexbox, that they'd be more flexible to work with."
    },
    {
      title: "node vs npm",
      userName: "bfett456@gmail.com",
      text: "Why can't I ever remember if I'm supposed to type `node` or `npm` into the terminal?"
    }
    
  ]).then(() => {
    console.log('----------POSTS SEEDED!----------');
    // process.exit();
  });

  User.bulkCreate([
    {
      email: "scelsic2@gmail.com",
      password: "password"
    },
    {
      email: "carmato@gmail.com",
      password: "password"
    },
    {
      email: "bfett456@gmail.com",
      password: "password"
    }
    
  ]).then(() => {
    console.log('----------USERS SEEDED!----------');
    // process.exit();
  });

  Comment.bulkCreate([
    {
      comment_text: "Wow, 12 weeks is fast!",
      user_id: 2,
      post_id: 1
    },
    {
      comment_text: "Yeah, that's like the worst name ever!",
      user_id: 1,
      post_id: 2
    }
  ]).then(() => {
    console.log('----------COMMENTS SEEDED!----------');
    process.exit();
  });

});
