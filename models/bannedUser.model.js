import { DataTypes } from "sequelize";
import db from "../configs/postgre.config.js";

const bannedUser=db.define("bannedUser",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default bannedUser;