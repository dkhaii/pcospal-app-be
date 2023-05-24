const express = require('express');
const { createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hompage');
});

router.post('/register', createUser);

module.exports = router;
