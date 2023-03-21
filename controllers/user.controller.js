import expressAsyncHandler from "express-async-handler"
import createError from "../errors/createError.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/sendToken.js";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import bannedUser from "../models/bannedUser.model.js";
import { Op } from "sequelize";

const createUser=expressAsyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;
    var ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if(!name){return next(createError(400,"name is required !!"))}
    if(!email){return next(createError(400,"email is required !!"))}
    if(!password){return next(createError(400,"password is required !!"))}

    if(password.length<8){
        return next(createError(400,"Your password must contain 8 characters!!"))
    }
    const isEmail=await User.findOne({where:{email}});
    if(isEmail){return next(createError(400,"email already exist !!"))}
    const user=await User.create({name,email,password,ipAddress});
    sendToken(user.dataValues,200,res);
})

const loginUser=expressAsyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email){return next(createError(400,"email is required..."))};
    if(!password){return next(createError(400,"password is required..."))};
    
    const user=await User.findOne({where:{email}});
    if(!user){return next(createError(400,"user not found..."))};
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){return next(createError(400,"wrong password..."))};
    
    let isBan=await bannedUser.findOne({where:{userId:user.id}});
    if(isBan){return next (createError(401,"Your id is banned !! sorry"))}
    sendToken(user,200,res);

})

//admin
const getAllUser=expressAsyncHandler(async(req,res,next)=>{
    const title=req.query.title || "";
    const page=req.params.page || 1;
    const limit=req.params.limit || 10;
    const skip=(page-1)*limit;
    
    let order=[['createdAt', 'DESC']];
    if(req.query.order==0){
        order=[]  
    }
    
    let user= await User.findAll({
        order,
        attributes:["id","name","email","createdAt","avatar","role","isActivated"],
        where:{
            [Op.or]:[
                {name:{[Op.iLike]:`%${title}%`}}]
    },offset:skip,
    limit});
    if(!user){return next(createError(400,'user not found...'))}
    const count=await User.findAndCountAll();
    const users=user.map((data)=>{
        const {password,...user}=data.dataValues;
        return user;
    })
    res.json({success:true,message:users,total:count.count}); 
   
})

//user
const getUser=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    if(!id){return next(createError(400,"id is required..."))}


    const users=await User.findByPk(id);
    const {password,...user}=users.dataValues;
    res.status(200).json({success:true,message:user});
})

//logout

const logout=expressAsyncHandler(async (req,res,next)=>{
    res.status(200).cookie("token","").json({success:true,message:"logout successful"})
})

//delete my account
const deleteUser=expressAsyncHandler(async(req,res,next)=>{
    
})

//get my info
const myInfo=expressAsyncHandler(async(req,res,next)=>{
    const user=req.user;
    if(!user){return next(createError(401,"please login again !!"))}
    
    res.status(200).json({success:true,message:user});
    
})

export const updateMyInfo=expressAsyncHandler(async(req,res,next)=>{
    const user=req.user;
    if(!user){return next(createError(401,"please login again !!"))}
    const {dob,address,name,password}=req.body;
    if(!dob){
        return next(createError(400,"Date of birth is required"))
    }
    if(!address){
        return next(createError(400,"address is required"))
    }
    if(!name){
        return next(createError(400,"name is required"))
    }
    if(!password){
        return next(createError(400,"password is required"))
    }
    const user1=await User.findByPk(user.id);
    if(!user1){return next(createError(400,"user not found"))}

    const isMatchedPassword=await bcrypt.compare(password,user1.password);
    if(!isMatchedPassword){return next(createError(401,"password doesn't matched !!"))}
    await user1.update({dob,address,name});
    await user1.save();
   res.status(200).json({success:true,message:"updated !!"}) 
   
})

export const updateEmail=expressAsyncHandler(async (req,res,next)=>{
    const {email,password}=req.body;

    if(!password){
        return next(createError(400,"password is required"))
    }
    if(!email){
        return next(createError(400,"email is required"))
    }
    const isEmailExist=await User.findOne({where:{email}});
    if(isEmailExist){return next(createError(400,"Try using different email !! this email is used by another !!"))}
    const userId=req.user.id;
    const user=await User.findByPk(userId);
    if(!user){
        return next(createError(400,"user not found please login !!"))
    }

    const isMatchedPassword=await bcrypt.compare(password,user.password);
    if(!isMatchedPassword){return next(createError(401,"password doesn't matched !!"))}
    
    await user.update({email,isActivated:false});
    await user.save();
    res.status(200).json({success:true,message:'updated email..'}) 
    
})

export const changePassword=expressAsyncHandler(async(req,res,next)=>{
    const userId=req.user.id;
    if(!userId){return next(createError(400,"login please !!"))}
    
    const {password,newPassword}=req.body;
    if(!password){return next(createError(400,"old password is required!!"))}
    if(!newPassword){return next(createError(400,"new password is required!!"))}
    if(newPassword.length<8){return next(createError(400,"minimum length of password should be 8"))}

    const user=await User.findByPk(userId);
    const isMatchedPassword=await bcrypt.compare(password,user.password);
    if(!isMatchedPassword){return next(createError(401,"old password doesn't matched !!"))}
    
    user.password=newPassword;
    await user.save();
    res.status(200).json({success:true,message:"password has been changed !!"});
})

//delete account

const deleteAccount=expressAsyncHandler(async(req,res,next)=>{
    const id=req.params.id;
    if(!id){return next(createError(404,"id is required to delete account"))}
    const isIdExist=await User.findByPk(id);
    if(!isIdExist){return next(createError(404,"Account not found..."))}
    await isIdExist.destroy();
    res.status(200).json({success:true,message:"user deleted successfully..."})
})
//verify account
const verifyAccount=expressAsyncHandler(async(req,res,next)=>{
    const {email}=req.body;
    if(!email){return next(createError(400,"email is required l!1"))}
    const user=await User.findOne({where:{email}});
    if(!user){return next(createError(400,"user with email doesn't found !!"))}


    try{
        const min=232323
        const max=934439
        const random=Math.floor(
            Math.random() * (max - min + 1) + min
          );

          const message=`Hey dear,\n your verify code is ${random}`;
          await sendMail({email,subject:"verify code",message});
          user.activateCode=random;
          user.expireCode=new Date(Date.now()+(1000*60*5))
          
          await user.save();
          res.status(200).json({success:true,message:`Code sent to ${email}. if message not found then please check your spam mails!!`})
    }catch(err){
        console.error(err);
        user.activateCode=null

        user.expireCode=null
        user.save()
        return next(createError(400,"email not sent!!"))
    };

})


const approveVerifyAccount=expressAsyncHandler(async(req,res,next)=>{
    const {email,activateCode}=req.body;
    if(!email){return next(createError(400,"email is required.."))}
    if(!activateCode){return next(createError(400,"activate code is required.."))}
    
    const user=await User.findOne({where:{email,activateCode}});
    if(!user){return next(createError(400,"wrong activation code !!"))}

    if(new Date(Date.now())>user.expireCode){
        return next(createError(400,"activation code expired !!"))
    }
    
    user.isActivated=true;
    user.activateCode=null;
    user.expireCode=null;
    if(user.email===process.env.ADMIN){
        user.role="admin"
     }
    await user.save()
    return res.status(200).json({success:true,message:"your account has been activated !"})

})

const forgotPassword= expressAsyncHandler(async(req,res,next)=>{
    const {email,activateCode}=req.body;
    if(!email){return next(createError(400,"email is required.."))}
    if(!activateCode){return next(createError(400,"activate code is required.."))}
    
    const user=await User.findOne({where:{activateCode}});
    if(!user){return next(createError(400,"wrong activation code !!"))}

    if(new Date(Date.now())>user.expireCode){
        return next(createError(400,"activation code expired !!"))
    }
    
    try{
    const newPassword=generator.generate({
        length: 8,
        numbers: true
    });

          const message=`Hey dear,\n your new password is ${newPassword}`;
          await sendMail({email,subject:"new password--hothotlearner",message});
          user.password=newPassword;
          await user.save();
          res.status(200).json({success:true,message:"Your new password is sent to your email. if not found please check on spam mails too!!"})
    }catch(err){
        console.error(err);
        user.activateCode=null

        user.expireCode=null
        user.save()
        return next(createError(400,"email not sent !!"))
    };
})

const banTheUser=expressAsyncHandler(async(req,res,next)=>{
    const userId=req.body.userId;
    const userExist=await bannedUser.findOne({where:{userId}});
    if(userExist){return next(createError(400,"user already banned !1"))}
    const userEmail=req.body.email;
    if(!userId){return next(createError(401,"user id is required..."))}
    if(!userEmail){return next(createError(401,"user email is required..."))}
    const banUser=await bannedUser.create({userId,email:userEmail});
    return res.status(200).json({success:true,message:banUser});
})

const getBannedUser=expressAsyncHandler(async(req,res,next)=>{

    let user= await bannedUser.findOne({where:{userId:req.params.id}});
if(!user){return next(createError(400,"user not found"))}
       return res.status(200).json({success:true,message:user});
})
const getAllBannedUser=expressAsyncHandler(async(req,res,next)=>{

let page=req.params.page || 1;
let limit=req.params.skip || 10;
const skip=(page-1) * limit;

  const user=await bannedUser.findAll({offset:skip,limit}); 
    return res.status(200).json({success:true,message:user});
    

})
const removeFromBan=expressAsyncHandler(async(req,res,next)=>{
    const userId=req.body.userId;
    const user=await bannedUser.destroy({where:{userId:userId}});
    if(!user){return next(createError(404,"user not found..."))}
    res.status(200).json({success:true,message:"user unbanned !!"})
})
export {createUser,getAllUser,getUser,loginUser,logout,myInfo,verifyAccount,approveVerifyAccount,forgotPassword,banTheUser,removeFromBan,getBannedUser,getAllBannedUser,deleteAccount};