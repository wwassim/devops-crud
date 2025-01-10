const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  lastName: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
