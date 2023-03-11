import db from "../configs/postgre.config.js"
import Blog from "./blog.model.js";
import User from "./user.model.js";
import Comment from "./comment.model.js";
import View from "./view.model.js";
import Fav from "./fav.model.js";
function link(){
    User.hasMany(Blog);
    Blog.belongsTo(User)
    
    Blog.hasMany(Comment,{foreignKey:"blogId"})
    Comment.belongsTo(Blog);
    
    User.hasMany(Comment)
    Comment.belongsTo(User,{foreignKey:"UserId"});

    Blog.hasMany(View,{foreignKey:"blogId"});
    View.belongsTo(Blog);

    User.hasMany(Fav,{foreignKey:"UserId"})
    Fav.belongsTo(User)
}

export default link;