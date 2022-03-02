const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "florista",
});
con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("connected");
});

module.exports = con;
