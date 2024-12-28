const express = require("express");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit/", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((k) => (loggedInUser[k] = req.body[k]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, Your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body;
    const isValidPassword = await req.user.validatePassword(oldPassword);

    if (!isValidPassword) {
      throw new Error("Older password is not correct");
    }

    if(!validator.isStrongPassword(newPassword)){
      throw new Error("Password is weak!!! ")
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    req.user.password = passwordHash;
    await req.user.save();

    res.send("Password Updated successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
