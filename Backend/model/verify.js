const mongoose = require("mongoose")
const verifySchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    sendCode:{
        type:String,
        required:true,
    }
},{timestamps:true})

const VerifyCode = mongoose.model("VerifyCode", verifySchema)
module.exports = VerifyCode;