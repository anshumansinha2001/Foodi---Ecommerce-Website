const { Schema, model } = require("mongoose");

// Create Schema for Cart Items
const cartSchema = new Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    trim: true,
    required: true,
  },
});

// create model
const Cart = model("Cart", cartSchema);
module.exports = Cart;
