const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const { responseClient } = require('../helper');

const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).json(
    responseClient(
      'success',
      'Selamat Datang di Welcome :) xixi',
      {
        backendDev: 'gerin tampan sekali',
        cloudEng: 'bang habib sang penakluk awan',
      },
    ),
  );
});
router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
