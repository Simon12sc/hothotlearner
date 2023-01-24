import { DataTypes } from "sequelize";
import db from "../configs/postgre.config.js";

const Comment=db.define('Comment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    text:DataTypes.STRING,
    blogId:DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
    
})

export default Comment;