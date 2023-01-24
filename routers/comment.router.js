import express from "express";
import { commentsOfBlog, createComment, deleteComment, updateComment } from "../controllers/comment.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
const commentRouter=express.Router();

commentRouter.post("/create",isAuthenticatedUser,createComment);
commentRouter.get("/get/:id/:page/:limit",commentsOfBlog);
commentRouter.delete("/delete",isAuthenticatedUser,deleteComment);
commentRouter.put("/update",isAuthenticatedUser,updateComment);

export default commentRouter;