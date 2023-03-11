import { DataTypes } from "sequelize";
import db from "../configs/postgre.config.js";
import bcrypt from "bcryptjs"

const User=db.define("User",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false  
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
            min:8,
            max:40
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value){
            let hashPassword=bcrypt.hashSync(value,10);
            this.setDataValue("password",hashPassword);
        }
    },
    activateCode:{
        type:DataTypes.INTEGER,
        defaultValue:null,
    },
    expireCode:{
        type:DataTypes.DATE,
        defaultValue:null
    },
    dob:{
        type:DataTypes.DATE,
    },
    avatar:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"user",
        allowNull:false
    },
    isActivated:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    ipAddress:{
        type:DataTypes.STRING,
    }
})



export default User;