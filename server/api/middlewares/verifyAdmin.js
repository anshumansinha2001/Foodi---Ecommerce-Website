const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  try {
    // Extract the email from the decoded token
    const email = req.decoded.email;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists and is an admin
    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden access!" });
    }

    // If the user is an admin, proceed to the next middleware
    next();
  } catch (error) {
    // Handle any errors that occur during the verification process
    console.error("Error verifying admin:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = verifyAdmin;
