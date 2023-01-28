const mongoose=require("mongoose")

const calcBMI=new mongoose.Schema({
    name:String,
    height:Number,
    weight:Number,
    value:Number
})

const CalcBMIModel=mongoose.model("BMI",calcBMI)

module.exports={CalcBMIModel}