const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");
const { connectDB } = require("./config/database.js");
const { User } = require("./models/user.js");

const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    res.status(400).send("Error occured while saving the user:" + err.message);
  }
});

//get user my email
app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const user = await User.findOne({emailId:userEmail});
    if(!user){
      res.status(400).send("User not found")
    }else{
      res.send(user);
    }
  }
  catch(err){
    res.status(400).send("Somthing went wrong")
  }
  
  // try{
  //   const users = await User.find({emailId:userEmail});
  //   if(users.length===0){
  //     res.status(400).send("User not found")
  //   }else{
  //     res.send(users)
  //   }
  // }catch(err){
  //   res.status(400).send("Somthing went wrong")
  // }
})

//get all user from database for feed
app.get("/feed", async (req,res)=>{
  const users = await User.find({})
  if(users.length===0){
    res.status(400).send("User Not found")
  }else{
    res.send(users);
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully listining");
    });
  })
  .catch((err) => {
    console.error("connection failed");
  });
