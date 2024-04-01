const jwt = require("jsonwebtoken");

// Verify jwt token Middleware
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token is invalid!" });
    }
    // Attach the decoded payload to the request object
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
