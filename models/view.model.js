import { DataTypes } from "sequelize"
import db from "../configs/postgre.config.js"

// will do in future
const View= db.define('View',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
UserId:{
    type:DataTypes.INTEGER
},
blogId:{
    type:DataTypes.INTEGER,
    allowNull:false
},
ipAddress:{
    type:DataTypes.STRING
}
})


export default View;