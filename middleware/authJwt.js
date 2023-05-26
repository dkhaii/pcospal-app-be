require('dotenv');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY);

      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'invalid token',
      });
    }
  }

  return res.status(401).json({
    message: 'missing or invalid authorization header',
  });
};

module.exports = verifyToken;
