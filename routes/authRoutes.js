const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const createUserAnswer = require('../controllers/pcosController');
const {
  createHistory,
  showAllUserHistory,
} = require('../controllers/historyController');
const createTipsAndTrick = require('../controllers/openaiController');
const generateData = require('../controllers/openaiController');

const authRouter = express.Router();

// pcos feature
authRouter.get('/pcos', verifyToken, createUserAnswer);
authRouter.post('/pcos', verifyToken, generateData);

// bmi feature
authRouter.post('/pcos/history', verifyToken, createHistory);
authRouter.get('/pcos/history', verifyToken, showAllUserHistory);
authRouter.get('/pcos/response', verifyToken, createTipsAndTrick);

module.exports = authRouter;
