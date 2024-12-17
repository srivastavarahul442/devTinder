
const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({firstName:"Rahul",lastName:"Kumar"})
})


app.listen(7777,()=>{
    console.log("Server is successfully listining")
})