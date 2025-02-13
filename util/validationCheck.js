const User = require('../models/user');

const { check, validationResult } = require('express-validator')

exports.registrationValidation = [
    check('email', 'Parameter email tidak sesuai format').not().isEmpty().isEmail().custom((value, {req}) => {
        return User.findEmail(value)
        .then(user => {
            if(user.rows[0]) {
                return Promise.reject('Email telah terdaftar')
            }
        })
    }).trim().normalizeEmail(),
    check('password', 'Password belum lengkap').not().isEmpty().isLength({min:8}).trim()
]

exports.loginValidation = [
    check('email', 'Parameter email tidak sesuai format').not().isEmpty().isEmail().custom((value, {req}) => {
        return User.findEmail(value)
        .then(user => {
            if(user.rows[0]) {
                return Promise.resolve('Email telah terdaftar')
            }
        })
    }).trim().normalizeEmail(),
    check('password', 'Password belum lengkap').not().isEmpty().isLength({min:8}).trim()
]

exports.amountValidation = [
    check('top_up_amount', 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0').not().isEmpty().isNumeric().trim()
]

exports.limitValidation = [
    check('limit', 'Paramter hanya boleh angka').isNumeric()
]

exports.validationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const error = new Error('Invalid Input');
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    } else {
        next();
    }
}