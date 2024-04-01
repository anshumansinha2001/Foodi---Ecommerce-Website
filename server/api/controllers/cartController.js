const Cart = require("../models/Cart");

//GET All Cart items using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const Carts = await Cart.find(query).exec();
    return res.status(200).json(Carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//POST Cart items to Database
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    // If exixting item
    const existingCartItem = await Cart.findOne({ email, menuItemId });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already added in the cart!" });
    }

    const cartItem = await Cart.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE cart items
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(400).json({ message: "Cart Items not Found!" });
    }

    res.status(200).json({ message: "Cart Items Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE cart item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        menuItemId,
        name,
        recipe,
        image,
        price,
        quantity,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCart) {
      return res.startus(404).json({ message: "Cart Item not Found!" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single Cart
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Cart.findById(cartId);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
};
