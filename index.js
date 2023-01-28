
const express =require("express")
const { connection } = require("./config/db")
const { userRoute } = require("./routes/user.route")
const { BMIRoute } = require("./routes/BMI.route")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/",userRoute)
app.use("/",BMIRoute)
app.listen(process.env.PORT,async()=>{

    try{
        await connection
        console.log("DB connected success")
    }catch(e){
        console.log("DB not connected")
        console.log(e)
    }
})