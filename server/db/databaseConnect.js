const mongoose = require("mongoose");

//? MongoDB Config using Mongoose
async function connectDB() {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodie-cluster.nch906r.mongodb.net/foodie-client?retryWrites=true&w=majority&appName=Foodie-Cluster`
    )
    .then(console.log("Successfully connected to MongoDB!"))
    .catch((err) => console.log("Error connecting to DB!", err));
}

module.exports = connectDB;
