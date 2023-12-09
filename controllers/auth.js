const { StatusCodes } = require('http-status-codes');

const User = require('../model/User');

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json(token);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `please provide name , unique email and pawword` });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'user not found' });
    }
    // compare passwords
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'password is not correct ' });
    }
    const token = user.createJWT();
    return res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name }, token });
  } catch (error) {
    return res
      .status(404)
      .json({ msg: 'something went wrong , please try again' });
  }
};

module.exports = { register, login };
