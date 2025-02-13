const User = require('../models/user');
const Transaction = require('../models/transaction');
const fileHelper = require('../util/file');
const errors = require('../util/errors');

exports.getProfile = (req, res, next) => {
    User.findEmail(req.email)
    .then(user => {
        user = user.rows[0]

        if(!user) {
            errors.userNotFound();
        }

        res.status(200).json({
            status: 200,
            message: 'sukses',
            data: user
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.putProfile = (req, res, next) => {
    const {first_name, last_name} = req.body;
    let tempUser;

    User.findEmail(req.email)
    .then(user => {
        tempUser = user.rows[0];

        if(!tempUser) {
            errors.userNotFound();
        }

        return User.update(tempUser.email, first_name, last_name, null, null);
    })
    .then(result => {
        res.status(200).json({
            status: 200,
            message: 'Update Profile berhasil',
            data: {
                email: tempUser.email,
                first_name: first_name,
                last_name: last_name,
                profile_image: tempUser.image_url
            }
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.putImage = (req, res, next) => {
    const image_url = req.file;
    let tempUser;

    User.findEmail(req.email)
    .then(user => {
        tempUser = user.rows[0];

        if(!tempUser) {
            errors.userNotFound();
        }
        
        if(!image_url) {
            errors.invalidImage();
        }

        fileHelper.deleteFile(tempUser.image_url);

        return User.update(tempUser.email, null, null, null, image_url.path);
    })
    .then(result => {
        res.status(200).json({
            status: 200,
            message: 'Update profile image berhasil',
            data: {
                email: tempUser.email,
                first_name: tempUser.first_name,
                last_name: tempUser.last_name,
                profile_image: image_url.path
            }
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBanner = (req, res, next) => {
    User.fetchBanner()
    .then(banner => {
        res.status(200).json({
            status: 200,
            message: 'Sukses',
            data: banner.rows
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getServices = (req, res, next) => {
    User.fetchServices()
    .then(services => {
        res.status(200).json({
            status: 200,
            message: 'Sukses',
            data: services.rows
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBalance = (req, res, next) => {
    User.findEmail(req.email)
    .then(user => {
        user = user.rows[0];

        if(!user) {
            errors.userNotFound();
        }

        return User.getUserBalance(user.email);
    })
    .then(balance => {
        balance = balance.rows[0];

        res.status(200).json({
            status: 200,
            message: 'Get Balance berhasil',
            data: balance
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postTopUp = (req, res, next) => {
    const amount = +req.body.top_up_amount;
    let tempUser;

    User.findEmail(req.email)
    .then(user => {
        tempUser = user.rows[0];

        if(amount <= 0) {
            errors.invalidAmount();
        }

        tempUser.balance += amount

        return User.update(tempUser.email, null, null, tempUser.balance, null);
    })
    .then(updatedBalance => {
        return Transaction.generateInvoice();
    })
    .then(generatedInvoice => {
        const transaction = new Transaction(generatedInvoice, 'TOPUP', tempUser.id, 'TOPUP', amount);
        return transaction.add();
    })
    .then(result => {
        res.status(200).json({
            status: 200,
            message: 'Top Up Balance berhasil',
            data: {
                balance: tempUser.balance
            }
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postTransaction = (req, res, next) => {
    const service_code = req.body.service_code;
    let tempUser, tempService, tempInvoice;

    User.findEmail(req.email)
    .then(user => {
        tempUser = user.rows[0];

        if(!tempUser) {
            errors.userNotFound();
        }

        return User.fetchServices()
    })
    .then(services => {
        services = services.rows;

        const findService = services.find(r => {
            return r.service_code === service_code
        })

        tempService = findService;

        if(!tempService) {
            errors.serviceNotFound();
        }

        if(tempUser.balance < tempService.service_tarif) {
            errors.lowBalance();
        }

        tempUser.balance -= tempService.service_tarif;
        return User.update(tempUser.email, null, null, tempUser.balance, null);
    })
    .then(updatedBalance => {
        return Transaction.generateInvoice()
    })
    .then(generatedInvoice => {
        tempInvoice = generatedInvoice;

        const transaction = new Transaction(generatedInvoice, tempService.service_code, tempUser.id, 'PAYMENT', tempService.service_tarif);
        return transaction.add();
    })
    .then(result => {
        res.status(200).json({
            status: 200,
            message: 'Transaksi Berhasil',
            data: {
                invoice_number: tempInvoice,
                service_code: tempService.service_code,
                service_name: tempService.service_name,
                transaction_type: 'PAYMENT',
                total_amount: tempService.service_tarif,
                created_on: new Date()
            }
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getTransactionHistory = (req, res, next) => {
    const limit = req.body.limit;

    User.findEmail(req.email)
    .then(user => {
        user = user.rows[0]

        if(!user) {
            errors.userNotFound();
        }

        if(!limit) {
            return Transaction.fetchAll(user.id);
        }
        return Transaction.fetchLimit(user.id, limit);
    })
    .then(result => {
        res.status(200).json({
            status: 200,
            message: 'Get History Berhasil',
            data: {
                offset: 0,
                limit: limit,
                records: result.rows
            }
        })
    })
    .catch(err => {
        next(err);
    })
}