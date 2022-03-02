require("dotenv").config();
const express=require("express");
const { signUp, UserLogin, logoutUser } = require("../controller/user");

const router=express.Router();

router.post("/register",signUp)

router.post("/login",UserLogin)

router.get("/logout",logoutUser)



module.exports=router