const jwt = require('jsonwebtoken');
const parseAppYaml = require('../config/environment');

const { JWT_SECRET_KEY } = parseAppYaml();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'missing or invalid authorization header',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token',
    });
  }

  return 0;
};

module.exports = verifyToken;
