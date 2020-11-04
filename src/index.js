require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// Connect to the mongodb server
const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.hzrai.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connect to mongo instance");
});
mongoose.connection.on("error", (error) => {
  console.error("Error connecting to mongo", error);
});

// Route to root file
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

// Listen to port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
