const express = require('express');
const { responseClient } = require('../helper');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  res.status(200).json(
    responseClient(
      'success',
      'Selamat Datang di Welcome :) xixi',
      {
        devOps: 'gerin tampan banget hahaha',
        cloudEng: 'bang habib sang penakluk awan google',
      },
    ),
  );
});

module.exports = homeRouter;
