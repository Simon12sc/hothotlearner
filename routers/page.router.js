import express from "express";
import { admin, forgotPage, homepage, loginPage, myInfo, registerPage,showBlog } from "../controllers/page.controller.js";
const pageRouter=express.Router();
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.middleware.js';

pageRouter.get("/",homepage);
pageRouter.get("/register",registerPage);
pageRouter.get("/login",loginPage);
pageRouter.get("/forgot",forgotPage);
pageRouter.get("/myInfo",myInfo);
pageRouter.get("/blog/:id/:title",showBlog);
pageRouter.get("/admin/dashboard", isAuthenticatedUser,authorizeRoles("admin"),admin);
export default pageRouter;