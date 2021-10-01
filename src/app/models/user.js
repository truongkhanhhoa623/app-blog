const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const User = new Schema({
  username: {type: String },
  email: {type: String},
  password: {type: String},
},{
    timestamps: true
});
User.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

User.method('comparePassword', function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password))
})

module.exports = mongoose.model("User", User)
