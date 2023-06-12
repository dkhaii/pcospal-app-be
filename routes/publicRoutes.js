const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const publicRouter = express.Router();

publicRouter.post('/register', createUser);
publicRouter.post('/login', loginUser);

module.exports = publicRouter;
