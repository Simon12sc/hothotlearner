import { DataTypes } from "sequelize";
import db from "../configs/postgre.config.js";

const Fav=db.define('Fav',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    blogId:DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
    
})

export default Fav;