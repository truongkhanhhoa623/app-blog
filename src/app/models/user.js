const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const User = new Schema(
  {
    _id: { type: Number },
    username: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    _id: false,
    timestamps: true,
  }
);
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//applie plugin
User.plugin(AutoIncrement)

User.method("comparePassword", function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
});

module.exports = mongoose.model("User", User);
