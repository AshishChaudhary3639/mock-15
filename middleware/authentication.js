const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const authentication=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]

    jwt.verify(token,process.env.SECRET_KEY,async(err,decode)=>{
        if(err){
            res.send({"err":"Please try to login"})
        }
        else{
            const {email}=decode
            const user=await UserModel.findOne({email})
            req.body.user_id=user._id
            console.log("auth",user)
            next()
        }
    })

}

module.exports={authentication}