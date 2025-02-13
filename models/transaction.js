const db = require('../util/database');

module.exports = class Transaction {
    constructor(invoice_number, service_code, user_id, transaction_type, total_amount) {
        this.invoice_number = invoice_number;
        this.service_code = service_code;
        this.user_id = user_id;
        this.transaction_type = transaction_type;
        this.total_amount = total_amount;
    }

    add() {
        return db.query('INSERT INTO transactions (invoice_number, service_code, user_id, transaction_type, total_amount) VALUES ($1, $2, $3, $4, $5)', [this.invoice_number, this.service_code, this.user_id, this.transaction_type, this.total_amount]);
    }

    static async generateInvoice() {
        try {
            const today = new Date();
            const date = today.toISOString().split('T')[0];
    
            const total = await db.query('SELECT COUNT(*) AS total FROM transactions')
            let oldNumber = 0;
            let newNumber = 0;

            if(total.rows[0].total >= 0) {
                oldNumber = total.rows[0].total;
            }
            newNumber = oldNumber + 1;
            
            return `INV${date}-${newNumber}`;
        } catch(err) {
            err.statusCode = 500;
            throw err;
        }
    }

    static fetchAll(user_id) {
        return db.query('SELECT * FROM transactions WHERE user_id = $1', [user_id]);
    }

    static fetchLimit(user_id, limit) {
        limit = parseInt(limit, 10)
        return db.query(`SELECT * FROM transactions WHERE user_id = $1 LIMIT ${limit}`, [user_id])
    }
}