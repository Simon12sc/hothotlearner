import createError from "../errors/createError.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";                                                
import User from "../models/user.model.js";
import bannedUser from "../models/bannedUser.model.js";

const isAuthenticatedUser=expressAsyncHandler(async (req,res,next)=>{
 const {token}=req.cookies;
 if(!token){
    return next(createError(401,"please login to access the resources"))
}

const decodeData=jwt.verify(token,process.env.JWT_SECRET);
if(!decodeData){
   return next(createError(401,"please login to access the resources"))
}
const users =(await User.findByPk(decodeData.id));
if(!users){return next(createError(401,"please login to access the resources"))}
const isBan=await bannedUser.findOne({where:{userId:users.id}});
if(isBan){
        return next(createError(404,"Your id is banned !! sorry"))
        }
const {password,...user}=users.dataValues;
req.user=user;

next()
})

const authorizeRoles=(...Roles)=>{
    return (req,res,next)=>{
        if(!Roles.includes(req.user.role)){
            return next(createError(401,req.user.role + " is not authorized... !!"));
        }
         next()
    }
}

export {isAuthenticatedUser,authorizeRoles};