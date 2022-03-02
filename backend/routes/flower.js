const con = require("../db");
const express = require("express");
const router = express.Router();
const checkauth = require("../middleware/check-auth");
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.put(
  "/flowers/:id",
  checkauth,
  multer({ storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    console.log(req.file);
    const flowerid = req.params.id;
    console.log(flowerid, req.body.image);
    console.log(req.body);
    let query = `Update flower1 set name="${req.body.name}",
    colorid=${req.body.color},description="${req.body.description}",type="${req.body.type}",
    price=${req.body.price},occassion="${req.body.occassion}" where flowerid=${req.body.flowerid}`;

    console.log(query);
    const promise = new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }).then((result) => {
      res.status(200).json({
        message: "Updated sucessfully",
      });
    });
  }
);

router.post(
  "/flowers/createFlower",
  checkauth,
  multer({ storage }).single("image"),
  (req, resp) => {
    console.log(req.file);
    const url = req.protocol + "://" + req.get("host");
    const imagePath = url + "/images/" + req.file.filename;
    console.log(req.body);
    let query = `Insert into flower1(name,colorid,description,type,price,image,occassion) values("${req.body.name}",
    ${req.body.color},"${req.body.description}","${req.body.type}","${req.body.price}","${imagePath}","${req.body.occassion}")`;

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
        query = `Select * from flower1 where flowerid=${result.insertId}`;
        const promise = new Promise((resolve, reject) => {
          con.query(query, function (err, result) {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
        }).then((result) => {
          resp.status(201).json({
            message: "Flower created",
            flower: result,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
router.get("/flowers/getFlowers", (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.currentpage;
  const skip = pagesize * (currentpage - 1);
  const limit = skip + "," + pagesize;
  console.log(pagesize, currentpage);
  let query;
  if (pagesize && currentpage) {
    query = "select count(*) from flower1";
    const promise = new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }).then((result) => {
      let count = result[0]["count(*)"];
      query = `Select * from flower1 limit ${limit}`;
      const promise = new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      }).then((result) => {
        res.status(200).json({
          message: "Flower Fetched successfully",
          flowers: result,
          count: count,
        });
      });
    });
  }
});

router.get("/collection/getByType", (req, res) => {
  const type = req.query.type;
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.currentpage;
  const skip = pagesize * (currentpage - 1);
  const limit = skip + "," + pagesize;
  console.log(pagesize, currentpage);
  if (pagesize && currentpage) {
    query = `Select count(*) from flower1 where type="${type}"`;
    const promise = new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }).then((result) => {
      let count = result[0]["count(*)"];
      console.log("count" + count);
      const query = `Select * from flower1 where type="${type}" limit ${limit}`;

      const promise = new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      }).then((result) => {
        res.status(200).json({
          message: "GetBytype",
          flowers: result,
          count: count,
        });
      });
    });
  }
});

router.get("/collection/getById", (req, res) => {
  const id = req.query.id;
  console.log(id);
  const query = `Select * from flower1 where flowerid="${id}"`;

  const promise = new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).then((result) => {
    res.status(200).json({
      message: "GetById",
      flowers: result,
    });
  });
});

router.get("/collection/getByOccassion", (req, res) => {
  const pagesize = +req.query.pagesize;
  const occassion = req.query.occassion;
  const currentpage = +req.query.currentpage;
  const skip = pagesize * (currentpage - 1);
  const limit = skip + "," + pagesize;
  console.log(pagesize, currentpage);
  let query;
  if (pagesize && currentpage) {
    query = `Select count(*) from flower1 where occassion="${occassion}"`;
    const promise = new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }).then((result) => {
      let count = result[0]["count(*)"];
      console.log(count);

      const query = `Select * from flower1 where occassion="${occassion}" limit ${limit}`;

      const promise = new Promise((resolve, reject) => {
        con.query(query, function (err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      }).then((result) => {
        res.status(200).json({
          message: "GetByOccassion",
          flowers: result,
          count: count,
        });
      });
    });
  }
});

// router.put(
//   "/flowers/:id",
//   multer({ storage }).single("image"),
//   (req, res, next) => {
//     console.log(req.file);
//     const flowerid = req.params.id;
//     console.log(flowerid, req.body.image);
//     res.status(200).json({
//       message: "Updated sucessfully",
//     });
//   }
// );

// router.get("/collection/:name", (req, res) => {
//   const name = req.params.name;
//   const query = `Select * from flower1 where name="${name}"`;

//   const promise = new Promise((resolve, reject) => {
//     con.query(query, function (err, result) {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   }).then((result) => {
//     res.status(200).json({
//       message: "GetByName",
//       flower: result,
//     });
//   });
// });

router.delete("/flowers/:id", checkauth, (req, res) => {
  const id = req.params.id;
  const query = `Delete from flower1 where flowerid="${id}"`;

  const promise = new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).then((result) => {
    res.status(200).json({
      message: "Flower deleted",
      result: result,
    });
  });
});

module.exports = router;
