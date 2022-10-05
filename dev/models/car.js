const mongoose = require("mongoose");

//SCHEMA SETUP
var carSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectID,
      ref:"User"
    },
    username: String
  },
  comments: [
    {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Comment"
  }
  ]
});

module.exports = mongoose.model("Car", carSchema);
