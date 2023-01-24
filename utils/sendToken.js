import jwt from "jsonwebtoken";

const sendToken=(user,statusCode,res)=>{
    // let token=jwt.sign(user.id,process.env.JWT_SECRET);
  
    let token=jwt.sign({id:user.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
    const options={
        expires:new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24*60*60*1000),httpOnly:true
    }
res.status(statusCode).cookie("token",token,options).json({success:true,user,token})
}



export default sendToken;