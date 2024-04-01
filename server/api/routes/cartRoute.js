const express = require("express");
const {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
} = require("../controllers/cartController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//All the Cart items operations
router.get("/", verifyToken, getCartByEmail);
router.post("/", addToCart);
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
router.get("/:id", getSingleCart);

module.exports = router;
