import express from "express";
import { changePassword, approveVerifyAccount, createUser, forgotPassword, getAllUser, getUser, loginUser, logout, myInfo, updateEmail, updateMyInfo, verifyAccount } from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.middleware.js";
const userRouter=express.Router();

userRouter.get("/me",isAuthenticatedUser,myInfo);
userRouter.get("/logout",logout);
userRouter.post("/update/myInfo",isAuthenticatedUser,updateMyInfo);
userRouter.get("/all",isAuthenticatedUser,authorizeRoles("admin"),getAllUser);
userRouter.get("/:id",isAuthenticatedUser,authorizeRoles("admin"),getUser);
userRouter.post("/auth/register",createUser);
userRouter.post("/auth/login",loginUser);
userRouter.post("/forgot",forgotPassword);
userRouter.post("/verify",verifyAccount);
userRouter.post("/activate",approveVerifyAccount);
userRouter.post("/update/email",isAuthenticatedUser,updateEmail);
userRouter.post("/update/password",isAuthenticatedUser,changePassword);
export default userRouter;
