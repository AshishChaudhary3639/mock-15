const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const { authentication } = require("../middleware/authentication");
const { CalcBMIModel } = require("../models/calcBMI.model");
const BMIRoute = Router();
require("dotenv")


BMIRoute.post("/calculateBMI",authentication,async(req,res)=>{
    const {name,height,weight,userID}=req.body

    try{
        let value=height/weight**2
        let calcBMI=new CalcBMIModel({
            name,
            height,
            weight,
            value
        })
        await calcBMI.save()
        res.send({"value":calcBMI})
    }
    catch(e){
        res.send({"err":"Something wrong"})
    }
})


BMIRoute.get("/getCalculation",authentication,async(req,res)=>{
    const {user_id}=req.body;
    try{
        const getBMI=await CalcBMIModel.find({user_id})
        res.send(getBMI)
    }catch(e){
        res.send({"err":"Data could not fetched"})
    }
})
module.exports={
    BMIRoute
}