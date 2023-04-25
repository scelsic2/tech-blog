const BlogPost = require('./BlogPost');
const User = require("./User");
const Comment = require ("./Comment");

User.hasMany(Comment, {foreignKey: "user_id"});
Post.hasMany(Comment, {foreignKey: "post_id"});

module.exports = {
  BlogPost,
  User,
  Comment
}