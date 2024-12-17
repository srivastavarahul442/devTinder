const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth.js")

const app = express();

app.use("/admin", adminAuth);
//app.use("/user", userAuth);

app.use("/user", userAuth, (req, res) => {
    res.send("User data checked");
  });

app.use("/admin/getAllData", (req, res) => {
  res.send("User data sent");
});

app.use("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(7777, () => {
  console.log("Server is successfully listining");
});
