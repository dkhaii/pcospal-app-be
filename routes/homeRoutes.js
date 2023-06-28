const express = require('express');
const { responseClient } = require('../helper');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.status(200).json(
    responseClient(
      'success',
      'Selamat Datang di Welcome :)',
      {
        devOps: 'gerin tampan bangett',
        cloudEng: 'bang habib sang penakluk awan google',
      },
    ),
  );
});

module.exports = homeRouter;
