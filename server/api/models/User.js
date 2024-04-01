const { Schema, model } = require("mongoose");

// Create Schema for Users
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// create model
const User = model("User", userSchema);
module.exports = User;
