require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/databaseConnect");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//? Database connection call
connectDB();

// Handling CORS policy issue which occurs due to run two diffrent servers for frontend or backend
const corsOption = {
  origin: process.env.BASE_URL,
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOption));

//? MiddleWare
// app.use(cors());
app.use(express.json());

//? JWT Authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// imports Routes here
const menuRoutes = require("./api/routes/menuRoute");
const cartRoutes = require("./api/routes/cartRoute");
const userRoutes = require("./api/routes/userRoute");
const paymentRoutes = require("./api/routes/paymentRoute");

app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

//? Stripe Payment Routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  if (isNaN(price) || price < 1) {
    console.log("Invalid Price");
    return;
  }
  try {
    const amount = price * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Foodie Server is Running!");
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
