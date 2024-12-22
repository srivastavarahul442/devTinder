const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");
const { connectDB } = require("./config/database.js");
const { User } = require("./models/user.js");

const app = express();

app.use(express.json());

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
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Somthing went wrong");
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
});

//get all user from database for feed
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  if (users.length === 0) {
    res.status(400).send("User Not found");
  } else {
    res.send(users);
  }
});

//delet a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    //const user = await User.findByIdAndDelete({_id:userId});
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

//update the data of the user in database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update are not allowed");
    }

    if(data?.skills.length>10){
      throw new Error("Skills can't be more then 10.")
    }

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("Use data updated successfully");
  } catch (err) {
    res.status(400).send("Update failed:" + err.message);
  }
});

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
