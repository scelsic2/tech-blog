const BlogPost = require('../models/BlogPost');
const db = require('./connection');

db.sync({ force: true }).then(() => {
  BlogPost.bulkCreate([
    {
      title: "How I Learned to Code in 12 Weeks",
      userName: "scelsic2",
      text: "After 14 years, I left my career to go back to school... again!"
    },
    {
      title: "Flexboxes - Why aren't They More Flexible?",
      userName: "carmato",
      text: "You'd think with a name like flexbox, that they'd be more flexible to work with."
    },
    {
      title: "node vs npm",
      userName: "bfett456",
      text: "Why can't I ever remember if I'm supposed to type `node` or `npm` into the terminal?"
    }
    
  ]).then(() => {
    console.log('Posts seeded!');
    process.exit();
  });
});
