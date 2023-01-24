import { DataTypes } from "sequelize";
import db from "../configs/postgre.config";

const Tag=db.define("Tag",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    tag:DataTypes.INTEGER
})

//will implenent later