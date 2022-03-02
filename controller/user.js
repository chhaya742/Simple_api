const knex=require("../database/db");
require("dotenv").config();
const {sign}=require("jsonwebtoken");
const bcrypt = require('bcrypt');
saltRounds=10;

// sign Up

signUp=(req,res)=>{
    if (!req.body.user_email||!req.body.password){
        res.send({
          "success": false,
          "status": 400,
          "message": "Got error while saving",
          })
          console.log({
            "success": false,
            "status": 400,
            "message": "Got error while saving",
            });
          return""
      }
    const salt = bcrypt.genSaltSync(saltRounds);
    const data={
        user_email:req.body.user_email,
        password:bcrypt.hashSync(req.body.password,salt)

    }
    knex("userData").insert(data)
    .then((d)=>{
        res.send("inserted")
    })
    .catch((err)=>{
        res.send(err)
    })
    

}

// login

UserLogin=(req,res)=>{
    if (!req.body.user_email||!req.body.password){
      res.send({
        "success": false,
        "status": 400,
        "message": "Got error while saving",
        })
        console.log({
          "success": false,
          "status": 400,
          "message": "Got error while saving",
          });
        return""
    }
  knex.from('userData').select("*").where("user_email","=",req.body.user_email,"password","=",req.body.password)
    .then((data) => {
      if (data.length==0){
        console.log("user account not exist");
        res.json({message:"this user account not exist"})
  
      }
      else{
      if(bcrypt.compareSync(req.body.password,data[0].password)){
      const token=sign({id:data[0].id},"chhayabagwan",{ expiresIn:"8h"})
      res.cookie("user",token)
          res.json({success: true,
          status: 200,
          message: "Login successfull.",
          token: token,
          expires_in:"8h"
        })
        console.log({message:data});
      }
      else{
        res.json({message:"error"})
      }
    }
    })
    .catch((err) => { 
      res.json({message:err })
      console.log({message:err });
      })
  }
  
  
  // // logoutusr
  
  logoutUser=(req,res)=>{
    res.clearCookie("user")
    res.json({message:"logout success"})
  
  
  }
  




module.exports={signUp,UserLogin,logoutUser}