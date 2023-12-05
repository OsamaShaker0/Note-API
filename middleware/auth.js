const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  const authHeadres = req.headers.authorization;
  if (!authHeadres || !authHeadres.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Auhtentication invalid ' });
  }
  const token = authHeadres.split(' ')[1];
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
