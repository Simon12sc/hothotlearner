import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlog, searchBlog, updateBlog, updateCoverImage } from "../controllers/blog.controller.js";
const blogRouter=express.Router();
import multer from "multer";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/cover_images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  blogRouter.post("/coverImage/:id",upload.single("cover_image"),updateCoverImage);
  blogRouter.patch("/:id",updateBlog);
blogRouter.get("/:page/:limit/search",searchBlog);
blogRouter.post("/create", isAuthenticatedUser,upload.single("cover_image"),createBlog);
blogRouter.get("/:page/:limit",getAllBlogs);
blogRouter.get("/:id",getBlog);
blogRouter.delete("/:id",deleteBlog);

export default blogRouter;