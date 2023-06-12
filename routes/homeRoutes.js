const express = require('express');
const { responseClient } = require('../helper');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.status(200).json(
    responseClient(
      'success',
      'Selamat Datang di Welcome :) xixi',
      {
        backendDev: 'gerin tampan sekali',
        cloudEng: 'bang habib sang penakluk awan google',
      },
    ),
  );
});

module.exports = homeRouter;
