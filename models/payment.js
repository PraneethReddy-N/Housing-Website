const mongoose = require('mongoose');

const leasePaymentSchema = new mongoose.Schema({
  leaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'leaseDetails', // Reference to the Lease model
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    required: true
  },
 
});

const LeasePayment = mongoose.model('LeasePayment', leasePaymentSchema);

module.exports = LeasePayment;
