import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlog, searchBlog, updateBlog, updateCoverImage } from "../controllers/blog.controller.js";
const blogRouter=express.Router();
import multer from "multer";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware.js";

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

  blogRouter.post("/create",isAuthenticatedUser,authorizeRoles("admin"),upload.single("cover_image"),createBlog);
blogRouter.post("/coverImage/:id",isAuthenticatedUser,authorizeRoles("admin"),upload.single("cover_image"),updateCoverImage);
blogRouter.post("/:id",isAuthenticatedUser,authorizeRoles("admin"),updateBlog);
blogRouter.get("/:page/:limit/search",searchBlog);
blogRouter.get("/:page/:limit",getAllBlogs);
blogRouter.get("/:id",getBlog);
blogRouter.delete("/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteBlog);

export default blogRouter;