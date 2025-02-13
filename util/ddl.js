exports.createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    balance DOUBLE PRECISION NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

exports.createBannerTable = `CREATE TABLE IF NOT EXISTS banners (
    id SERIAL PRIMARY KEY,
    banner_name VARCHAR(255) NOT NULL,
    banner_image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

exports.createServiceTable = `CREATE TABLE IF NOT EXISTS services (
    service_code VARCHAR(255) PRIMARY KEY NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_icon VARCHAR(255) NOT NULL,
    service_tarif DOUBLE PRECISION NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

exports.createTransactionTable = `CREATE TABLE IF NOT EXISTS transactions (
    invoice_number VARCHAR(16) PRIMARY KEY NOT NULL,
    service_code VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    total_amount DOUBLE PRECISION NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_code) REFERENCES services(service_code),
    FOREIGN KEY (user_id) REFERENCES users(id))`;
