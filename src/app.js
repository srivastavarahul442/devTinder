const express = require("express");

const app = express();

/**
 * app.use("/route", rH1, rH2, rH3, rH4, rH5)
 * app.use("/route", [rH1, rH2, rH3, rH4, rH5])
 * app.use("/route", [rH1, rH2], rH3, rH4, rH5)
 * 
 * it will work same for get post delete...
 */

app.use(
  "/user",
  //1st route handler function
  (req, res,next) => {
    next();
    // res.send("1st route handler")
    console.log("1st")
    
  },
  //2nd route handler function
  (req,res,next) => {
    // res.send("2nd route handler");
    next();
    console.log("2nd")
  },
  //2nd route handler function
  (req,res,next)=>{
    res.send("3rd route handler")
    // next();
    console.log("3rd")
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listining");
});
