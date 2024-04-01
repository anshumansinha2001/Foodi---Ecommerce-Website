const { Schema, model } = require("mongoose");

// Create Schema for Payments Items
const paymentSchema = new Schema({
  transactionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  statusColor: String,
  itemImage: Array,
  itemName: Array,
  itemId: Array,
  menuItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Payment = model("Payment", paymentSchema);
module.exports = Payment;
