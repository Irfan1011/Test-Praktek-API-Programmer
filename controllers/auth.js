const User = require('../models/user');
const errors = require('../util/errors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postRegistration = (req, res, next) => {
    const {email, first_name, last_name, password} = req.body;

    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User(null, email, first_name, last_name, 'images\\profile.png', null, hashedPassword);
        return user.add();
    })
    .then(user => {
        res.status(200).json({
            status: 200,
            message: 'Registrasi berhasil silahkan login',
            data: null
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body;
    let tempUser;

    User.findEmail(email)
    .then(user => {
        if(!user.rows[0]){
            errors.userNotFound();
        }

        tempUser = user.rows[0];

        return bcrypt.compare(password, user.rows[0].password)
    })
    .then(matchPw => {
        if(!matchPw) {
            errors.invalidUsernameOrPassword();
        }

        return jwt.sign({
            email: tempUser.email,
        },'secret', {expiresIn: '12h'});
    })
    .then(token => {
        res.status(200).json({
            status: 200,
            message: "Login Sukses",
            data: {
                token: token
            }
        })
    })
    .catch(err => {
        next(err)
    })
}