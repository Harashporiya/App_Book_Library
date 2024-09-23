const Router = require("express");
const User = require("../model/user");
const router = Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secretKey = "ydhdbdsuwgebejdhkdndfhhff"

router.post("/signup", async(req,res)=>{
    const {firstName, lastName, email, password} = await req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const accountCreate = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        const token = jwt.sign({userId:accountCreate._id},secretKey,{expiresIn:"2d"})
        return res.json({"message":"Account created successfull",accountCreate, token}).status(200);
    } catch (error) {
        return res.json({"message":"error", error}).status(500);
    }
})

router.post("/signin", async(req,res)=>{
 try {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword){
        return res.json({"message":"Password not correct"}).status(400)
    }
    const token = jwt.sign({userId:user._id}, secretKey,{expiresIn:"2d"})
    return res.json({"message":"Signin Successfull", token, user}).status(200)
 } catch (error) {
    return res.json({"message":"Signin error"}).status(500);
 }
})

module.exports = router