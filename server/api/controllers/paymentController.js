const mongoose = require("mongoose"); // Import mongoose here
const Payment = require("../models/Payment");
const Cart = require("../models/Cart");
const ObjectId = mongoose.Types.ObjectId;

//POST Payments Details
const postPaymentDetails = async (req, res) => {
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
};

//GET Payments Details By Email
const getPaymentsByEmail = async (req, res) => {
  const email = req.params.email;
  const payment = await Payment.findOne({ email });

  try {
    if (!payment) {
      return res.status(404).json({ message: "Payment Details not found" });
    }
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    const result = await Payment.find({ email }).sort({ createdAt: -1 }).exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET All Payment Details for ADMIN
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postPaymentDetails, getPaymentsByEmail, getAllPayments };
