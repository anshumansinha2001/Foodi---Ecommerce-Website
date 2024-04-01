const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  makeUserBack,
} = require("../controllers/userController");

const verifyToken = require("../middlewares//verifyToken");
// const verifyAdmin = require("../middlewares/verifyAdmin");

//GET All Users Operations
router.get("/", verifyToken, getAllUsers);
router.post("/", createUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/admin/:email", verifyToken, getAdmin);
router.patch("/admin/:id/makeadmin", verifyToken, makeAdmin);
router.patch("/admin/:id/makeuserback", verifyToken, makeUserBack);

module.exports = router;
