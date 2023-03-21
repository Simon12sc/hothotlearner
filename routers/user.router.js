import express from "express";
import { changePassword, approveVerifyAccount, createUser, forgotPassword, getAllUser, getUser, loginUser, logout, myInfo, updateEmail, updateMyInfo, verifyAccount, banTheUser, getBannedUser, removeFromBan, getAllBannedUser, deleteAccount } from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware.js";
const userRouter=express.Router();

userRouter.get("/me",isAuthenticatedUser, myInfo);
userRouter.get("/logout",isAuthenticatedUser,logout);
userRouter.post("/update/myInfo",isAuthenticatedUser, updateMyInfo);
userRouter.get("/all/:page/:limit/search",isAuthenticatedUser,authorizeRoles("admin"), getAllUser);
userRouter.get("/:id",isAuthenticatedUser,authorizeRoles("admin"), getUser);
userRouter.post("/auth/register",createUser);
userRouter.post("/auth/login",loginUser);
userRouter.post("/forgot",forgotPassword);
userRouter.post("/verify",verifyAccount);
userRouter.post("/activate",approveVerifyAccount);
userRouter.post("/update/email",isAuthenticatedUser, updateEmail);
userRouter.post("/update/password",isAuthenticatedUser, changePassword);

userRouter.delete("/deleteAccount/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteAccount);
//banned user api
userRouter.post("/banned",isAuthenticatedUser,authorizeRoles("admin"),banTheUser);
userRouter.get("/getBannedUser/:id",isAuthenticatedUser,authorizeRoles("admin"),getBannedUser);
userRouter.get("/getAllBannedUser/:page/:skip",isAuthenticatedUser,authorizeRoles("admin"),getAllBannedUser);
userRouter.delete("/ban/",isAuthenticatedUser,authorizeRoles("admin"),removeFromBan);
export default userRouter;
