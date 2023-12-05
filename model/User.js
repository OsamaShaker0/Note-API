const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please provide name '],
    trim: true,
    minlength: 3,
    maxlength: 12,
  },
  email: {
    type: String,
    require: [true, 'please provide email '],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'please provide email '],
    minlength: 6,
  },
});
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, name: this.name },
    process.env.SECRET_KEY,
    { expiresIn: '30d' }
  );
};
UserSchema.methods.comparePassword = async function (give_pass) {
  const isMatch = await bcrypt.compare(give_pass, this.password);
  return isMatch;
};
module.exports = mongoose.model('User', UserSchema);
