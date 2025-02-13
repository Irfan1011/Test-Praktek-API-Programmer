exports.insertBannersData = `INSERT INTO banners (banner_name, banner_image, description) VALUES
    ('Banner 1', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 2', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 3', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 4', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 5', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
    ('Banner 6', 'images\\\\dummy.jpg', 'Lerem Ipsum Dolor sit amet')`;

exports.totalBanner = `SELECT COUNT(*) as total FROM banners`;

exports.insertServicesData = `INSERT INTO services (service_code, service_name, service_icon, service_tarif) VALUES
    ('PAJAK', 'Pajak PBB', 'images\\\\dummy.jpg', 40000),
    ('PLN', 'Listrik', 'images\\\\dummy.jpg', 10000),
    ('PDAM', 'PDAM Berlangganan', 'images\\\\dummy.jpg', 40000),
    ('PULSA', 'Pulsa', 'images\\\\dummy.jpg', 40000),
    ('PGN', 'PGN Berlangganan', 'images\\\\dummy.jpg', 50000),
    ('MUSIK', 'Musik Berlangganan', 'images\\\\dummy.jpg', 50000),
    ('TV', 'TV Berlangganan', 'images\\\\dummy.jpg', 50000),
    ('PAKET_DATA', 'Paket data', 'images\\\\dummy.jpg', 50000),
    ('VOUCHER_GAME', 'Voucher Game', 'images\\\\dummy.jpg', 100000),
    ('VOUCHER_MAKANAN', 'Voucher Makanan', 'images\\\\dummy.jpg', 100000),
    ('QURBAN', 'Qurban', 'images\\\\dummy.jpg', 200000),
    ('ZAKAT', 'Zakat', 'images\\\\dummy.jpg', 300000),
    ('TOPUP', 'Top Up', 'images\\\\dummy.jpg', 2000)`;

exports.totalServices = `SELECT COUNT(*) AS total FROM services`;