var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
var mongo = require("./config/mongo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "MealTracker";

// Use connect method to connect to the server
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log("Failed to connect mongo :: ", err);
    } else {
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      mongo.setMongo(db);
    }

    //   client.close();
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

console.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

module.exports = app;
