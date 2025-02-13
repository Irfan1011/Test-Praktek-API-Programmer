const express = require('express');

const userController = require('../controllers/user');
const validationCheck = require('../util/validationCheck');
const isAuth = require('../util/isAuth');

const router = express.Router();

router.get('/profile', isAuth, userController.getProfile);
router.put('/profile/update', isAuth, userController.putProfile);
router.put('/profile/image', isAuth, userController.putImage);
router.get('/banner', userController.getBanner);
router.get('/services', isAuth, userController.getServices);
router.get('/balance', isAuth, userController.getBalance);
router.post('/topup', isAuth, validationCheck.amountValidation, validationCheck.validationHandler, userController.postTopUp);
router.post('/transaction', isAuth, userController.postTransaction);
router.get('/transaction/history', isAuth, validationCheck.limitValidation, validationCheck.validationHandler, userController.getTransactionHistory);

module.exports = router;