const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const createUserAnswer = require('../controllers/pcosController');
const {
  createHistory,
  showAllUserHistory,
} = require('../controllers/historyController');
const createTipsAndTrick = require('../controllers/openaiController');
const generateData = require('../controllers/openaiController');
const { showUserData } = require('../controllers/userController');

const authRouter = express.Router();

// user
authRouter.get('/user', verifyToken, showUserData);

// pcos feature
authRouter.post('/pcos', verifyToken, createUserAnswer);
authRouter.post('/pcos/result', verifyToken, generateData);

// history feature
authRouter.post('/pcos/history', verifyToken, createHistory);
authRouter.get('/pcos/history', verifyToken, showAllUserHistory);
authRouter.get('/pcos/response', verifyToken, createTipsAndTrick);

module.exports = authRouter;
