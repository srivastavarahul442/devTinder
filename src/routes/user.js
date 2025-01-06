const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { User } = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    // console.log(allRequests);

    res.send(allRequests);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const userConnections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("toUserId", USER_SAFE_DATA)
      .populate("fromUserId", USER_SAFE_DATA);

    const data = userConnections.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data: data });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const requestedAndAcceptedUser = await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id},
            {fromUserId:loggedInUser._id}
        ]
    })

    const allUsers1 = await User.find({
        $nor:[
            {_id:requestedAndAcceptedUser.map((row)=>row.toUserId)},
            {_id:requestedAndAcceptedUser.map((row)=>row.fromUserId)},
            {_id:loggedInUser._id}
        ]
    }).select(USER_SAFE_DATA);
    
    res.send(allUsers1);
  } catch (err) {
    res.send("Error : " + err.message);
  }
});

module.exports = userRouter;
