const express = require("express");
const app = express();
const multer = require("multer");
require("dotenv/config");
const loginModel = require("./model/admin");
const homeModel = require("./model/models");
const aboutModel = require("./model/about");
const footerModel = require("./model/footer");
const navModel = require("./model/nav");
var cors = require("cors");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { response } = require("express");
const { unlinkSync } = require("fs");
app.use(bodyParser.json());
const JWT_SECRET = "askjnbsjakldbasbdalkjsdbasjkldbajkwdbkjwabdljkbdklawndlka";
const port = 4001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads"),
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.listen(port, function () {
  console.log("ok");
});
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected");
    } else {
      console.log(err);
    }
  }
);
app.post("/api/admin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await loginModel.findOne({ username, password }).lean();
  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.json({ status: "ok", data: token });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    res.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}
/*********************************************************POST TO Import DATA for Home Page*************************************************/
app.post(
  "/api/add",
  verifyToken,
  upload.single("ImageUpload"),
  async (req, res) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    title = req.body.name;
    desc1 = req.body.title_desc;
    desc = req.body.paragraph;
    ImageUpload = req.file.path;
    console.log(title);
    const DATE = new Date();
    const DateTime =
      monthNames[DATE.getUTCMonth()] +
      "/" +
      DATE.getUTCDate() +
      "/" +
      DATE.getUTCFullYear();
    let home = await new homeModel({
      title: title,
      desc1: desc1,
      desc: desc,
      date: DateTime,
      ImageUpload: ImageUpload,
    });
    home.save((err, home) => {
      if (err) res.send({ message: "momo" });
      else res.send({ status: 200, data: home });
    });
  }
);
/*********************************************************POST TO Import DATA for about Page*************************************************/
app.post(
  "/api/addabout",
  verifyToken,
  upload.single("ImageUpload"),
  async (req, res) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    title = req.body.name;
    desc1 = req.body.title_desc;
    desc = req.body.paragraph;
    ImageUpload = req.file.path;
    console.log(title);
    const DATE = new Date();
    const DateTime =
      monthNames[DATE.getUTCMonth()] +
      "/" +
      DATE.getUTCDate() +
      "/" +
      DATE.getUTCFullYear();
    let about = await new aboutModel({
      title: title,
      desc1: desc1,
      desc: desc,
      date: DateTime,
      ImageUpload: ImageUpload,
    });
    about.save((err, about) => {
      if (err) res.send({ message: "momo" });
      else res.send({ status: 200, data: about });
    });
  }
);
/*********************************************************GET DATA for Home Page*************************************************/
app.get("/GET/api/home", async function (req, res) {
  await homeModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ data: response });
  });
});
/*********************************************************GET DATA for About Page*************************************************/
app.get("/GET/api/about", async function (req, res) {
  await aboutModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ data: response });
  });
});
/*********************************************************Delete DATA for Home Page*************************************************/
app.delete("/listhome/:id", verifyToken, async function (req, res) {
  homeModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
/*********************************************************Delete DATA for About Page*************************************************/
app.delete("/listabout/:id", verifyToken, async function (req, res) {
  aboutModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
/*********************************************************GET DATA for Home Page*************************************************/
app.get("/nav", async function (req, res) {
  await navModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ data: response });
  });
});
/*********************************************************GET DATA for Footer Page*************************************************/
app.get("/footer", async function (req, res) {
  await footerModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ data: response });
  });
});
/*********************************************************Edit DATA for Home Page*************************************************/
app.put(
  "/edit/:id",
  verifyToken,
  upload.single("ImageUpload"),
  function (req, res) {
    // create mongose method to update a existing record into collection
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const DATE = new Date();
    const DateTime =
      monthNames[DATE.getUTCMonth()] +
      "/" +
      DATE.getUTCDate() +
      "/" +
      DATE.getUTCFullYear();
    Id = req.params.id;
    Title = req.body.first;
    second = req.body.second;
    fourth = req.body.fourth;
    ImageUpload = req.file.path;
    console.log(Title, second, fourth);
    var data = {
      $set: {
        title: Title,
        desc1: second,
        desc: fourth,
        date: DateTime,
        ImageUpload: ImageUpload,
      },
    };
    // save the user
    homeModel.findOneAndUpdate(
      Id,
      data,
      { useFindAndModify: false },
      function (err, response) {
        if (err) throw err;
        res.send({ status: "yes", data: response });
      }
    );
  }
);
/*********************************************************GET DATA for About Page*************************************************/

app.put(
  "/edit1/:id",
  verifyToken,
  upload.single("ImageUpload"),
  function (req, res) {
    // create mongose method to update a existing record into collection
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const DATE = new Date();
    const DateTime =
      monthNames[DATE.getUTCMonth()] +
      "/" +
      DATE.getUTCDate() +
      "/" +
      DATE.getUTCFullYear();
    Id = req.params.id;
    Title = req.body.first;
    second = req.body.second;
    fourth = req.body.fourth;
    ImageUpload = req.file.path;
    console.log(Title, second, fourth);
    var data = {
      $set: {
        title: Title,
        desc1: second,
        desc: fourth,
        date: DateTime,
        ImageUpload: ImageUpload,
      },
    };
    // save the user
    aboutModel.findOneAndUpdate(
      Id,
      data,
      { useFindAndModify: false },
      function (err, response) {
        if (err) throw err;
        res.send({ status: "yes", data: response });
      }
    );
  }
);
/*********************************************************GET DATA for nav Page*************************************************/
app.put("/api/nav/:id", verifyToken, function (req, res) {
  Id = req.params.id;
  Twitter = req.body.twitter;
  Facebook = req.body.facebook;
  Instagram = req.body.instagram;
  console.log(Twitter, Facebook, Instagram);
  var data = {
    $set: {
      twitter: Twitter,
      facebook: Facebook,
      instagram: Instagram,
    },
  };
  navModel.findOneAndUpdate(
    Id,
    data,
    { useFindAndModify: false },
    function (err, response) {
      if (err) throw err;
      res.send({ status: "yes", data: response });
    }
  );
});
/*********************************************************GET DATA for Footer Page*************************************************/
app.put("/api/footer/:id", verifyToken, function (req, res) {
  Id = req.params.id;
  Twitter = req.body.twitter;
  Facebook = req.body.facebook;
  Instagram = req.body.instagram;
  Aim = req.body.aim;
  Vision = req.body.vision;
  Teaching = req.body.teaching;
  Coding = req.body.coding;
  Internships = req.body.internships;
  Anasweb = req.body.anasweb;

  console.log(Twitter, Facebook, Instagram);
  var data = {
    $set: {
      aim: Aim,
      vision: Vision,
      teaching: Teaching,
      internships: Internships,
      coding: Coding,
      anasweb: Anasweb,
      twitter: Twitter,
      facebook: Facebook,
      instagram: Instagram,
    },
  };
  footerModel.findOneAndUpdate(
    Id,
    data,
    { useFindAndModify: false },
    function (err, response) {
      if (err) throw err;
      res.send({ status: "yes", data: response });
    }
  );
});
/*********************************************************GET DATA for NEW Page*************************************************/
app.get("/new/:id", async function (req, res) {
  const id=req.params.id;
  await homeModel.findById({_id:id},(err, response) => {
    if (err) res.send(err);
    else {res.send({ data: response })
    console.log(response);
  };
  });
});