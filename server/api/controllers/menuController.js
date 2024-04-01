const Menu = require("../models/Menu");

//GET All Menu items operations
const getAllMenuItems = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    return res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//POST Menu items to Database
const postMenuItems = async (req, res) => {
  const menuItem = req.body;
  try {
    const result = await Menu.create(menuItem);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Menu Item
const deleteMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuItemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item Not Found!" });
    }
    res.status(200).json({ message: "Item has been deleted!", deletedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Menu Item by ID
const getSingleMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  try {
    const menu = await Menu.findById(menuItemId);
    if (!menu) {
      return res.status(404).json({ message: "Item Not Found!" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Single Menu Item by ID
const updateMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  const { _id, name, recipe, image, category, price } = req.body;
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      menuItemId,
      {
        _id,
        name,
        recipe,
        image,
        category,
        price,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item Not Found!" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItems,
  deleteMenuItem,
  getSingleMenuItem,
  updateMenuItem,
};
