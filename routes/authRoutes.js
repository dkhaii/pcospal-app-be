const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const getUserAnswer = require('../controllers/pcosController');
const { createHistory, showAllUserHistory } = require('../controllers/historyController');

const authRouter = express.Router();

// pcos feature
authRouter.get('/pcos', verifyToken, getUserAnswer);

// bmi feature
authRouter.post('/pcos/history', verifyToken, createHistory);
authRouter.get('/pcos/history', verifyToken, showAllUserHistory);

module.exports = authRouter;
