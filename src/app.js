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
