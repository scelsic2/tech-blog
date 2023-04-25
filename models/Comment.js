const { Model, DataTypes, INTEGER } = require('sequelize');
const db = require('../config/connection');
// const bcrypt = require('bcrypt');

class Comment extends Model {
    // async validatePass(provided_password){
    //     const is_valid = await bcrypt.compare(provided_password, this.password);
    //     return is_valid;
    // }
}

Comment.init({
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    post_id: {
         type: INTEGER,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'comment',
    // hooks: {
    //     async beforeCreate() {
    //          const encrypted_pass = await bcrypt.hash(user.password, 10);
    //          user.password = encrypted_pass;
    //     }
    // }
  })

module.exports = Comment;