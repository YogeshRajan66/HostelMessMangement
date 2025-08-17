const mongoose = require('mongoose');

// Define the schema for the Payment model
const paymentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true // Required field
    },
    studentUsername: {
        type: String,
        required: true // Required field
    },
    type: {
        type: String,
        enum: ['mess', 'hostel'], // Enum for payment types
        required: true // Required field
    },
    amount: {
        type: Number,
        required: true // Required field
    },
    date: {
        type: Date,
        default:null // Defaults to current date
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'], // Enum for payment status
        default: 'pending' // Defaults to pending
    },
    paymentMethod: {
        type: String,
        default: null // Optional, can be filled later
    },
    transactionId: {
        type: String,
        default: null // Optional, can be filled later
    }
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
