let mongoose = require("mongoose");
var cors = require("cors");
let footerSchema = new mongoose.Schema(
  {
    aim: { type: String, require: true },
    vision: { type: String, require: true },
    teaching: { type: String, require: true },
    internships: { type: String, require: true },
    coding: { type: String, require: true },
    anasweb: { type: String, require: true },
    twitter: { type: String, require: true },
    facebook: { type: String, require: true },
    instagram: { type: String, require: true },
  },
  { collection: "footer" }
);
let footerModel = mongoose.model("footer", footerSchema);

module.exports = footerModel;
