
const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Rahul",lastName:"Kumar"})
})

app.post("/user",(req,res)=>{
    //save the data to DB
    res.send("Saved the data to database")
})

app.delete("/user",(req,res)=>{
    //save the data to DB
    res.send("data is deleted")
})

app.use("/user",(req,res)=>{
    res.send("Hello from the test");
})


app.listen(7777,()=>{
    console.log("Server is successfully listining")
})