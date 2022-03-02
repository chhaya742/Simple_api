require("dotenv").config();
const express=require("express")
const app=express();
const multer=require('multer')

const upload=multer();

const router=require("./routes/routes")

app.use(upload.array());
app.use("/",router)

app.get("/",(req,res)=>{
    res.send("ohk")
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT} port `);

});