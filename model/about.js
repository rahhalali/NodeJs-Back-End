let mongoose = require("mongoose");
var cors = require("cors");
let aboutSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    desc1: { type: String, require: true },
    desc: { type: String, require: true },
    date: { type: String, require: true },
    ImageUpload: { type: String, require: true },
  },
  { collection: "abouts" }
);
let aboutModel = mongoose.model("about", aboutSchema);

module.exports = aboutModel;
