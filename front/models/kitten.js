const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({
  name: String,
});

exports.Kitten = mongoose.model("Kitten", kittySchema);
