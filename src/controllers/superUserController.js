const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const superUser = require("../models/superUserModel");

const registerSuperUser = async (req, res) => {
  const user = await superUser.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { phone: user.phoneNumber, password: user.password },
    token,
  });
};

const loginSuperUser = async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const user = await superUser.findOne({ phoneNumber });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.ACCEPTED)
    .json({ user: { name: user.name, phone: user.phoneNumber }, token });
};

module.exports = {
  registerSuperUser,
  loginSuperUser,
};
