const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const { updateUser } = require('../controllers/userController');
const getUserAnswer = require('../controllers/pcosController');
const { calculateBmi, showAllBmiHistory } = require('../controllers/bmiCalculatorController');

const authRouter = express.Router();

authRouter.put('/user', verifyToken, updateUser);

// pcos feature
authRouter.get('/pcos', verifyToken, getUserAnswer);

// bmi feature
authRouter.post('/bmi', verifyToken, calculateBmi);
authRouter.get('/bmi', verifyToken, showAllBmiHistory);

module.exports = authRouter;
