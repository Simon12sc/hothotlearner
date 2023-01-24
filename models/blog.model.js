import {DataTypes } from "sequelize";
import db from "../configs/postgre.config.js";

const Blog =  db.define("blog",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    shortDescription:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING(50000),
        allowNull:false
    },
    tags:{
        type:DataTypes.STRING
    },
    cover_image:{
        type:DataTypes.STRING
    },
    isApproved:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})


export default Blog;