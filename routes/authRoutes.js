const express = require('express');
const verifyToken = require('../middleware/authJwt');
const { updateUser } = require('../controllers/userController');

const authRouter = express.Router();

authRouter.put('/user', verifyToken, updateUser);

module.exports = authRouter;
