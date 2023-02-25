const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const httpStatusCodes = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError(
      httpStatusCodes.unauthorized.messages.incorrectUserData,
    );
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new UnauthorizedError(
      httpStatusCodes.unauthorized.messages.incorrectUserData,
    );
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
