const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
  req.user = {};
  req.user._id = "628b1347d9181ade68d2c2ca";
  next();
});

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: " + err);
  });
