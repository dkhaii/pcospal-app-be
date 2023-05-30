const express = require('express');
const verifyToken = require('../middleware/verifyAuthMiddleware');
const { updateUser } = require('../controllers/userController');
const getUserAnswer = require('../controllers/pcosController');

const authRouter = express.Router();

authRouter.put('/user', verifyToken, updateUser);

// pcos feature
authRouter.get('/pcos', verifyToken, getUserAnswer);

module.exports = authRouter;
