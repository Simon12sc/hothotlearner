import db from "../configs/postgre.config.js"
import Blog from "./blog.model.js";
import User from "./user.model.js";
import Comment from "./comment.model.js";
function link(){
    User.hasMany(Blog);
    Blog.belongsTo(User)
    
    Blog.hasMany(Comment,{foreignKey:"blogId"})
    Comment.belongsTo(Blog);
    
    User.hasMany(Comment)
    Comment.belongsTo(User,{foreignKey:"UserId"});
}

export default link;