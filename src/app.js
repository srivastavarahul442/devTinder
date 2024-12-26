const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/requests.js")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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
