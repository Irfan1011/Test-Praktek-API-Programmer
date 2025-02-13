exports.userNotFound = () => {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
}

exports.unauthorized = () => {
    const  err = new Error('Unauthorized');
    err.statusCode = 401;
    err.data = [{
        msg: 'Token tidak tidak valid atau kadaluwarsa'
    }]
    throw err
}

exports.invalidUsernameOrPassword = () => {
    const err = new Error('Username atau password salah');
    err.statusCode = 401;
    throw err;
}

exports.invalidImage = () => {
    const err = new Error('Format image tidak sesuai');
    err.statusCode = 400;
    throw err;
}

exports.invalidAmount = () => {
    const err = new Error('Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0');
    err.statusCode = 400;
    throw err;
}

exports.serviceNotFound = () => {
    const err = new Error('Service atau Layanan tidak ditemukan');
    err.statuCode = 400;
    throw err;
}

exports.lowBalance = () => {
    const err = new Error('Balance is not enough');
    err.statuCode = 400;
    throw err;
}