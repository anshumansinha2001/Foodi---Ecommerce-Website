const { Schema, model } = require("mongoose");

// Create Schema for Menu Items
const menuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  category: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Menu = model("Menu", menuSchema);
module.exports = Menu;
