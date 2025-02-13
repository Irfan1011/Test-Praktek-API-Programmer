const express = require('express');
const multer = require('multer');

const app = express();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const db = require('./util/database');
const ddl = require('./util/ddl');
const dml = require('./util/dml');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        const unique = Date.now();
        cb(null, unique + '-' + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(express.json());

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image_url'));

app.use(authRouter);
app.use(userRouter);
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Page not found'
    })
});

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ status: status, message: data ? data.rows.msg : message, data: null});
})

db.query(ddl.createUserTable)
.then(__ => {
    return db.query(ddl.createBannerTable);
})
.then(__ => {
    return db.query(dml.totalBanner)
    .then(totalBanner => {
        if(totalBanner.rows[0].total <= 0) {
            return db.query(dml.insertBannersData);
        }
    })
})
.then(__ => {
    return db.query(ddl.createServiceTable);
})
.then(__ => {
    return db.query(dml.totalServices)
    .then(totalServices => {
        if(totalServices.rows[0].total <= 0) {
            return db.query(dml.insertServicesData);
        }
    })
})
.then(__ => {
    return db.query(ddl.createTransactionTable);
})
.then(result => {
    app.listen(process.env.PORT || 3000);
    console.log('CONNECTED')
})
.catch(err => {
    err.statusCode = 500;
    throw new Error('Failed create database');
})