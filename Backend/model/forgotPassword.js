const mongoose = require("mongoose")
const forgotPasswordSchema = new mongoose.Schema({
    newPassword:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }

},{timestamps:true})
const Forgot = mongoose.model("Forgot", forgotPasswordSchema)
module.exports = Forgot