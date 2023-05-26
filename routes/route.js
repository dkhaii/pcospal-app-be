const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authJwt');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hompage');
});

router.post('/user/register', createUser);
router.post('/user/login', loginUser);

router.get('/auth/dashboard', verifyToken, (req, res) => {
  res.json({
    message: 'ini kalau login',
  });
});

module.exports = router;
