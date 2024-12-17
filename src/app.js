
const express = require("express");

const app = express();



app.use("/test",(req,res)=>{
    res.send("Hello from the test");
})

app.use("/home",(req,res)=>{
    res.send("Hello from the home");
})

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
})

app.use("/",(req,res)=>{
    res.send("Hello from the /");
})

app.listen(7777,()=>{
    console.log("Server is successfully listining")
})