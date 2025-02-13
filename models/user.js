const db = require('../util/database');

module.exports = class User {
    constructor(id, email, first_name, last_name, image_url, balance, password) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.image_url = image_url;
        this.balance = balance;
        this.password = password;
    }

    add() {
        return db.query('INSERT INTO users (email, first_name, last_name, image_url, balance, password) VALUES ($1, $2, $3, $4, 0, $5)', [this.email, this.first_name, this.last_name, this.image_url, this.password]);
    }

    static update(email, first_name, last_name, balance, image_url) {
        if(first_name || last_name) {
            return db.query('UPDATE users SET first_name = $1 , last_name = $2 WHERE email = $3', [first_name, last_name, email]);
        } else if(image_url) {
            return db.query('UPDATE users SET image_url = $1 WHERE email = $2', [image_url, email]);
        } else {
            return db.query('UPDATE users SET balance = $1 WHERE email = $2', [balance, email]);
        }
    }

    static findEmail(email) {
        return db.query('SELECT * FROM users WHERE email = $1', [email]);
    }

    static fetchBanner() {
        return db.query('SELECT * FROM banners');
    }

    static fetchServices() {
        return db.query('SELECT * FROM services');
    }

    static getUserBalance(email) {
        return db.query('SELECT balance FROM users WHERE email = $1', [email]);
    }
}