var express = require("express");
var router = express.Router();

var localStorage = require('localStorage')

var db = require("../database/connection");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("auth/login");
});

// signup
router.get("/signup", function (req, res, next) {
  res.render("auth/signup");
});

router.post("/signup", function (req, res, next) {
  console.log("inside the signup post");
  // getting the values
  const payload = {
    login: req.body.login,
    uname: req.body.uname,
    pass: req.body.pass,
    fname: req.body.fname,
    age: req.body.age,
    dob: req.body.dob,
    gender: req.body.male || req.body.female,
    no: req.body.no,
    city: req.body.city,
    states: req.body.states,
    mail: req.body.mail,
    Address: req.body.Address,
  };

  // console.log("payload", payload);

  var sql =
    "INSERT INTO signup (registered_as,uname,upass,fname,age,dob,gender,phoneno,city,state,email,address) VALUES ?";
  var values = [
    [
      payload.login,
      payload.uname,
      payload.pass,
      payload.fname,
      parseInt(payload.age),
      payload.dob,
      payload.gender || payload.gender,
      payload.no,
      payload.city,
      payload.states,
      payload.mail,
      payload.Address,
    ],
  ];
  db.query(sql, [values], function (err, result) {
    if (err) throw err;
    res.redirect("/login");
  });
});

router.get("/login", function (req, res, next) {
  res.render("auth/login");
});

// login
router.post("/login", function (req, res, next) {
  const payload = {
    user: req.body.uname,
    pass: req.body.pass,
  };

  console.log("payload", payload);

  var sql = `Select registered_as,uname,upass from signup where uname = '${payload.user}' and upass = '${payload.pass}'`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      console.log('result', result)
      localStorage.setItem('isLogin','true');
      res.redirect("/admin");
    } else {
      localStorage.setItem('isLogin','false');
      res.redirect("/login");
    }
  });
  // res.render("auth/login");
});

router.get("/home/index", function (req, res, next) {
  res.render("home/index"); //not working
});

router.get("/admin", function (req, res, next) {
  const token = localStorage.getItem('isLogin')
  console.log('token here', token);
  res.render("auth/adminRoom");
});

router.get("/auth/change-password", function (req, res, next) {
  res.render("auth/changePass");
});

router.get("/driver", function (req, res, next) {
  res.render("services/driver");
});

router.get("/user/add-vehicle", function (req, res, next) {
  res.render("services/addVehicle");
});

router.get("/user/booking", function (req, res, next) {
  res.render("services/booking");
});

module.exports = router;
