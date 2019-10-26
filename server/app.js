const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const appRoute = require("./routes/index");

dotenv.config();

const app = express();

// Database Name
const dbName = "MealTracker";

// Use connect method to connect to the server
console.log("DB", process.env.DB_CONNECT);
mongoose.connect(
  process.env.DB_CONNECT + "/" + dbName,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  error =>
    console.log(
      `${error ? `Error connecting to DB ${error}` : `Connected to DB`}`
    )
);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.use("/api", appRoute);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

module.exports = app;
