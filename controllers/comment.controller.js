
import expressAsyncHandler from "express-async-handler";
import createError from "../errors/createError.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const commentsOfBlog=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const limit=Number(req.params.limit) || 15;
    const page=Number(req.params.page) || 1;
    const offset=limit * (page -1);
    if(!id){return next(createError(400,"blog id is required...."))}
    
    const comments=await Comment.findAll({
        order:[["createdAt","DESC"]],
        where:{
            blogId:id
        },
        include:[{model:User,attributes:["id","name","role"]}],
            limit,
            offset
});

    res.json({success:true,message:comments})
})

export const createComment= expressAsyncHandler(async (req,res,next)=>{
    
    if(!req.user){return next(createError(400,"please login to comment..."))}
    const {id}=req.user;
    const {message,blogId}=req.body;

    let user=await User.findByPk(id);
    if(!user.isActivated){
        return next(createError(400,"Activate your email please"))
    }
    if(!message){return next(createError(400,"empty comment not allwed..."))}
    if(!blogId){return next(createError(400,"blog id is required...."))}
    
    const blog=await Blog.findByPk(blogId);
    if(!blog){return next(createError(404,"blog not found!!"))}
    const comment=await Comment.create({UserId:id,text:message,blogId:Number(blogId)});

    res.json({success:true,message:comment})

})

export const deleteComment=expressAsyncHandler(async(req,res,next)=>{
    
    const {id}=req.user;
    if(!id){return next(createError(401,"please login to delete comment"))}
    const {commentId,blogId}=req.body;
    
    if(!blogId){return next(createError(400,"blog id is required...."))}
    if(!commentId){return next(createError(400,"empty comment not allwed..."))}
    
    const blog=await Blog.findByPk(blogId);
    if(!blog){return next(createError(404,"blog not found to comment..."))}
    
    const comment=await Comment.findByPk(commentId);
    if(!comment){return next(createError(404,"comment not found..."))}
    if(comment.UserId!==id){
        if(!comment){return next(createError(404,"you can't delete this comment..."))}
    }
    
    await comment.destroy();
    res.json({success:true,message:"comment deleted successfully"})
})


export const updateComment=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.user;
    if(!id){return next(createError(401,"please login to delete comment"))}
    const {commentId,blogId,message}=req.body;
    if(!message){return next(createError(400,"please hit some comment"))}
    
    if(!blogId){return next(createError(400,"blog id is required...."))}
    if(!commentId){return next(createError(400,"empty comment not allwed..."))}
    
    const blog=await Blog.findByPk(blogId);
    if(!blog){return next(createError(404,"blog not found to comment..."))}
    
    const comment=await Comment.findByPk(commentId);
    if(!comment){return next(createError(404,"comment not found..."))}
    if(comment.UserId!==id){
        if(!comment){return next(createError(404,"you can't UPDATE this comment..."))}
    }
    
    const updatedcomment=await comment.update({text:message});

    res.json({success:true,message:updatedcomment})
    
})