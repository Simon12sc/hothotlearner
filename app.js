import express from "express"
const app=express();

import dotenv from "dotenv"
dotenv.config({path:"configs/.env"});

import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import rateLimit from "express-rate-limit";
// import helmet from "helmet";
// app.use(
//     helmet({
//       contentSecurityPolicy: {
//         directives: {
//           defaultSrc: ["'self'"],
//           imgSrc: ["'self'", "data:","*"],
//           scriptSrc:["'self'","https://cdn.ckeditor.com"]
//         },
//       },
//       crossOriginEmbedderPolicy: false,
//       crossOriginResourcePolicy: false,
//     })
//   );
export const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // limit each IP to 100 requests per windowMs
        message: "Too many requests, please try again later"
      });
      
      //  apply to all requests
      app.use(limiter);
    
      
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.use(express.static(__dirname+"public/assets"))

import blogRouter from "./routers/blog.router.js";
import userRouter from "./routers/user.router.js";
import commentRouter from "./routers/comment.router.js";
import pageRouter from "./routers/page.router.js";



app.use("/",pageRouter);
app.use("/api/blog",blogRouter);
app.use("/api/user",userRouter);
app.use("/api/comment",commentRouter);

app.get("/js/showblog.js",(req,res,next)=>{
  console.log(__dirname+"public/assets/showblog.js")
  res.status(200).sendFile(__dirname +"public/showblog.js")
})
app.get("/image/:name",(req,res,next)=>{
    res.sendFile(`${__dirname}/public/cover_images/${req.params.name}`);
})

app.use((err,req,res,next)=>{
    const message=err.message || "internal server error";
    const statusCode=err.statusCode || 500;
    res.status(statusCode).json({success:false,error:message,stack:err.stack})
})

export default app;