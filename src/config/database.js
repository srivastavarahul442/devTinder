const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteDev:CS30JswV2pS31Gwg@namastenode.fnko7.mongodb.net/devTinder"
  );
};

module.exports = {connectDB}


