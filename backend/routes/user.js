const con = require("../db");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const query = `Insert into user(name,email,password) values("${req.body.name}","${req.body.email}","${hash}")`;
    const promise = new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    })
      .then((result) => {
        console.log(result);

        res.status(201).json({
          message: "You are logged in successfully",
          email: req.body.email,
        });
      })
      .catch((err) => {
        res.status(409).json({
          error: err,
        });
      });
  });
});
router.post("/login", (req, resp) => {
  const query = `select * from user where email="${req.body.email}"`;

  const prmoise = new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  })
    .then((res) => {
      bcrypt.compare(req.body.password, res[0].password).then((result) => {
        if (!result) {
          return resp.status(401).json({
            error: "Incorrect Password",
          });
        }

        let cartid = Math.floor(Math.random() * 100) + 1;
        //creating cart
        const query = `insert into cart values(${cartid},${
          res[0].userid
        },'rochester','USA','Minetonka','Minetonka',${parseInt(
          "12345"
        )},${parseInt("12345678")})`;
        console.log(query);
        const prmoise = new Promise((resolve, reject) => {
          con.query(query, function (err, result) {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
        }).then((result) => {
          //json web token
          const token = jwt.sign(
            { email: res[0].email, userid: res[0].userid },
            "secret_this_should_be_longer",
            { expiresIn: "1h" }
          );
          resp.status(200).json({
            token: token,
            expiresIn: 3600,
            userid: res[0].userid,
            cartid: cartid,
          });
        });
      });
    })
    .catch((err) => {
      return resp.status(404).json({
        error: "User does not exist",
      });
    });
});
module.exports = router;
