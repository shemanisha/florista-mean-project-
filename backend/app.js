const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const userroutes = require("./routes/user");
const flowersroutes = require("./routes/flower");
const cartroutes = require("./routes/cart");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use("/api/users", userroutes);
app.use("/api/", flowersroutes);
app.use("/api/cart", cartroutes);

module.exports = app;
