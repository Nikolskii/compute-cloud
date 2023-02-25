const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const httpStatusCodes = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(httpStatusCodes.created.code).send({
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    next(e);
  }
  return undefined;
};

const loginUser = async (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      {
        expiresIn: '7d',
      },
    );

    return res.send({ token });
  } catch (e) {
    next(e);
  }
  return undefined;
};

const getUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.user);
    }

    return res.status(httpStatusCodes.ok.code).send(user);
  } catch (e) {
    next(e);
  }
  return undefined;
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.user);
    }

    return res.status(httpStatusCodes.ok.code).send(updatedUser);
  } catch (e) {
    next(e);
  }
  return undefined;
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
};
