const mongoose = require('mongoose');
const User = require('./User');

const leaseTransactionsSchema = new mongoose.Schema({
    session_id: { type: String, required: true },
    payment_intent: { type: String, required: true },
    amount_total: { type: Number, required: true },
    currency: { type: String, required: true },
    payment_status: { type: String, required: true, enum: ['paid', 'unpaid', 'no_payment_required'] },
    user_email: { type: String, ref: 'User' },
    lease: { type: mongoose.Schema.Types.ObjectId, ref: 'lease' }
}, { timestamps: true });

const Transactions = mongoose.model('Transaction',leaseTransactionsSchema);

module.exports = Transactions;