const express = require("express");
const corse = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const api=require("./routes/api")

const ErrorMiddleware = require("./http/middleware/Error");

const app = express();

class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddleware();
    this.setupConfig();
  }
  setupRoutesAndMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    if (app.get("env") === "production") app.use(morgan(tiny));
    app.use(corse());
    app.use(ErrorMiddleware);

    //* Routes
    app.use("/api",api)

  }
  setupConfig() {
    winston.add(new winston.transports.File({ filename: "error-log.log" }));
    winston.add(
      new winston.transports.MongoDB({
        db: "mongodb://localhost:27017/nodeFood",
      })
    );
    process.on("uncaughtException", (err) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on("unhandledRejection", (err) => {
      console.log(err);
      winston.error(err.message);
    });
    app.set("view engine", "pug");
    app.set("views", "../views");
  }
  setupMongoose() {
    mongoose
      .connect("mongodb://localhost:27017/nodeFood", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("database connected");
        winston.info("database connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  setupExpressServer() {
    const port = process.env.port || 3000;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log("listening on port " + port);
    });
  }
}

module.exports = Application;
