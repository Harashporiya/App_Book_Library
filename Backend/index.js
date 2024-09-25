const mongoose = require("mongoose")
const express = require("express")
const userRouter = require("./route/user")
const app = express();
const cors = require("cors")
const verifyRouter = require("./route/verify");
const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/bookLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(cors())
app.use(express.json());

app.use("/user",userRouter)
app.use("/api", verifyRouter)

app.get("/", async(req,res)=>{
    return res.send("Harash")
})

app.listen(PORT,()=>console.log(`Server Started At PORT ${PORT}`))

