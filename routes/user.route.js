const { Router } = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const jwt=require("jsonwebtoken")
const userRoute = Router();
require("dotenv")
userRoute.post("/register", async(req, res) => {
  const { name, email, password } = req.body;

  let isUserExist=await UserModel.findOne({email})
  if(isUserExist){
    req.send({"err":"User already exist"})
  }
  else{
      bcrypt.hash(password, 4, async function (err, hashedPass) {
        // Store hash in your password DB.
        if (hashedPass) {
          try {
            let user = new UserModel({
              name: name,
              email: email,
              password: hashedPass,
            });
            await user.save();
            res.send({"msg":"User register success"})
          } catch (e) {
            res.send({ err: "Something wrong" });
          }
        }
      });
  }

});


userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await UserModel.findOne({email})
        let hashedPass=user.password
        bcrypt.compare(password, hashedPass, function(err, result) {
            // result == true
            if(result){
                const token=jwt.sign({email},process.env.SECRET_KEY)
                res.send({"token":token})
            }
            else{
                res.send({"err":"Login failed"})
            }
        });

    }catch(e){
        console.log({"err":"Something wrong"})
        console.log(e)
    }

    
})


module.exports = {
  userRoute,
};
