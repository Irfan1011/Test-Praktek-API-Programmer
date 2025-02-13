const express = require('express');

const validationCheck = require('../util/validationCheck');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/registration', validationCheck.registrationValidation, validationCheck.validationHandler, authController.postRegistration);
router.post('/login', validationCheck.loginValidation, validationCheck.validationHandler, authController.postLogin);

module.exports = router;