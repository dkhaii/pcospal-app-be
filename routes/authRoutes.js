const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const {
  createUserAnswer,
  calculateBmi,
} = require('../controllers/pcosController');
const {
  createHistory,
  showAllUserHistory,
} = require('../controllers/historyController');
const createTipsAndTrick = require('../controllers/openaiController');
const generateData = require('../controllers/openaiController');
const { showUserData } = require('../controllers/userController');
const getClassificationResult = require('../controllers/classificationResultController');

const authRouter = express.Router();

// user
authRouter.get('/user', verifyToken, showUserData);

// pcos feature
authRouter.post('/calculate-bmi', verifyToken, calculateBmi);
authRouter.post('/pcos', verifyToken, createUserAnswer);
authRouter.get('/pcos/result', verifyToken, getClassificationResult);
authRouter.post('/pcos/result', verifyToken, generateData);

// history feature
authRouter.post('/pcos/history', verifyToken, createHistory);
authRouter.get('/pcos/history', verifyToken, showAllUserHistory);
authRouter.get('/pcos/response', verifyToken, createTipsAndTrick);

module.exports = authRouter;
