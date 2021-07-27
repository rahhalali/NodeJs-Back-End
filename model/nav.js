let mongoose = require("mongoose");
var cors = require("cors");
let navSchema = new mongoose.Schema(
  {
    twitter: { type: String, require: true },
    facebook: { type: String, require: true },
    instagram: { type: String, require: true },
  },
  { collection: "nav" }
);
let navModel = mongoose.model("nav", navSchema);

module.exports = navModel;