const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation.js");
const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { userAuth } = require("../middlewares/auth.js");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //validation for user signup
    validateSignupData(req);

    //Encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Email id is not valid");
    }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", userAuth, (req, res) => {
  const user = req.user;
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send(user.firstName + " Has Logged out successfully");
});

module.exports = authRouter;
