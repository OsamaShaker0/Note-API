const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Auhtentication invalid ' });
  }

  const token = authHeaders.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { userId: payload.userID, name: payload.name };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' });
  }
};
module.exports = auth;
