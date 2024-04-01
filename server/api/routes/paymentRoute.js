const express = require("express");
const mongoose = require("mongoose"); // Import mongoose here
const Payment = require("../models/Payment");
const Cart = require("../models/Cart");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

// Token
const verifyToken = require("../middlewares/verifyToken");

//POST Payments Details
router.post("/", verifyToken, async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    //DELETE Cart Items After Payment
    const cartIds = payment.itemId.map((id) => new ObjectId(id));
    const deletedCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });

    res.status(200).json(paymentRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//GET ALL Payments Details
router.get("/", verifyToken, async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      return res.status(403).json({ message: "Forbidden Access!" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
