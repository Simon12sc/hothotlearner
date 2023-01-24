import createError from "../errors/createError.js"
import Blog from "../models/blog.model.js"
import { Op } from "sequelize";
import expressAsyncHandler from "express-async-handler";
import fs from "fs";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

//Admin can create blog
const createBlog=expressAsyncHandler( async (req,res,next)=>{
   const {title,shortDescription,description,tags}=req.body;
   const cover_image=req.file.filename;
   if(!title){
    return next(createError(400,"title is required !!"))}
   if(!description){
    return next(createError(400,"description is required !!"))}
    if(!tags){
    return next(createError(400,"tag is required !!"))}
   if(!cover_image){return next(createError(400,"cover image is required !!"))}
   let data=await Blog.create({title,shortDescription,description,tags,cover_image:req.file.filename,isApproved:true,UserId:req.user.id})
  await data.save()
   res.json({success:true,message:data})
})

//admin
const getAllBlogs=expressAsyncHandler(  async (req,res,next)=>{

    const page=req.params.page || 1;
    const limit=req.params.limit || 10;
    const skip=(page-1) * limit;
    const count=await Blog.findAndCountAll();
    let blog=await Blog.findAll({
        order: [['createdAt', 'DESC']],
        offset:skip,limit,include:Comment});
    res.json({success:true,message:blog,total:count.count})
})


//user can search blog with id
const getBlog=expressAsyncHandler( async (req,res,next)=>{
    const id=req.params.id;
    if(!id){return next(createError(400,'blog not found...'))}
    let blog=await Blog.findByPk(id,{where:{isApproved:true},include:[{
        model:User,
        attributes:['id',"name","role"]
        
    },
    {
        model:Comment,
        include:[{model:User,attributes:['id',"name","role"]}]

    }
    ]});
    if(!blog){return next(createError(400,'blog not found...'))}
    
    res.json({success:true,message:blog})
})

// user can search with blog
const searchBlog=expressAsyncHandler( async(req,res,next)=>{
    const title=req.query.title || "";
    const tags=req.query.tags || "";
    const page=req.params.page || 1;
    const limit=req.params.limit || 10;
    const skip=(page-1)*limit;
    
    let order=[['createdAt', 'DESC']];
    if(req.query.order==0){
        order=[]
    }
    let blog= await Blog.findAll({
        order,
        attributes:["id","title","shortDescription","createdAt","cover_image"],
        where:{
            [Op.or]:[
                {title:{[Op.iLike]:`%${title}%`}},
                {tags:{[Op.iLike]:`%${title}%`}}],
        isApproved:true,
    },offset:skip,
    limit});
    const count=await Blog.findAndCountAll();
    if(!blog){return next(createError(400,'blog not found...'))}
    res.json({success:true,message:blog,total:count.count});
})

// admin can update blog
const updateBlog=expressAsyncHandler( async (req,res,next)=>{
    const {id}=req.params;
    if(!id){return next(createError(400,"id is required..."))}

    const blog=await Blog.findByPk(id);
    if(!blog){return next(createError(400,"blog not found !!"))}

    blog.title= req.body.title || blog.title;
    blog.description=req.body.description || blog.description;
    blog.tags=req.body.tags || blog.tags
    blog.shortdescription=req.body.shortdescription || blog.shortdescription
    await blog.save();

    res.json({success:true,message:blog});
})

//delete blog
const deleteBlog=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    if(!id){return next(createError(400,"id is required.."))};

    const blog=await Blog.findByPk(id);

    if(!blog){return next(createError(400,"Blog not found.."))}
    
    fs.unlink(`public/cover_images/${blog.cover_image}`,(err)=>{
        if(err){return next(createError(400,"Problem in deleting images.."))}
        console.log("deleted images")
    })
    
    await blog.destroy();
    await blog.save();
    res.status(200).json({success:true,message:"Blog deleted successfully!!"})
    
})

const updateCoverImage=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
 if(!id){return next(createError(400,"id is required..."))}
 let blog=await Blog.findByPk(id);
 if(!blog){return next(createError(400,"blog not found !!"))}
 
 const cover_image=req.file.filename;   
 if(!cover_image){return next(createError(400,"cover image is required !!"))}

 fs.unlink(`public/cover_images/${blog.cover_image}`,(err)=>{
       if(err){
        fs.unlink(`public/cover_images/${req.file.filename}`,(err)=>{if(err){console.log(err)}});
        return next(createError(400,"Problem in deleting old images.."))
    }
})
    blog.cover_image=cover_image;
    await blog.save()
res.status(200).json({success:true,message:blog});
})


export {getAllBlogs,createBlog,getBlog,searchBlog,updateBlog,deleteBlog,updateCoverImage}