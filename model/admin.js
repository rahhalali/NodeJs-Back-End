let mongoose = require("mongoose");
var cors = require("cors");
let loginSchema = new mongoose.Schema(
    {
        username: { type: String },
        password:{type:String},
    },
    { collection: "admin" }
);
let loginModel = mongoose.model("login", loginSchema);

module.exports = loginModel;
