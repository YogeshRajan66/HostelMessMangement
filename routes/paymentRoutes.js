const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Route for rendering the payment page
router.get('/payment', async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    try {
        // Fetch payment details for the logged-in student using their username
        const payments = await Payment.find({ studentUsername: req.session.username });

        // Initialize amounts
        let messAmount = 0;
        let hostelAmount = 0;
        let hasPendingPayments = false; // Flag to check for pending payments

        // Map through the payments to separate the amounts
        payments.forEach(payment => {
            if (payment.type === 'mess' && payment.status === 'pending') {
                messAmount += payment.amount;
                hasPendingPayments = true; // Found a pending mess payment
            } else if (payment.type === 'hostel' && payment.status === 'pending') {
                hostelAmount += payment.amount;
                hasPendingPayments = true; // Found a pending hostel payment
            }
        });

        // Render the payment page with payment details
        res.render('payment/payment', {
            username: req.session.username, // Pass username explicitly
            payments: payments,
            messAmount: messAmount,
            hostelAmount: hostelAmount,
            hasPendingPayments: hasPendingPayments // Pass the flag to the template
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for handling the payment submission
router.post('/payment', async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    console.log('Payment request received');
    console.log(req.body);

    const { category, paymentMethod, cardNumber, cardExpiry, cardCvv, upiId, studentUsername } = req.body;

    try {
        // Find the payment record
        const payment = await Payment.findOne({
            studentUsername: studentUsername,
            type: category,
            status: 'pending'
        });

        if (!payment) {
            console.error('No pending payment found for the selected category.');
            return res.status(400).send('No pending payment found for the selected category.');
        }

        // Simulate payment processing
        payment.paymentMethod = paymentMethod;
        payment.transactionId = `TXN${Date.now()}`;
        payment.status = 'completed';

        // Save the updated payment record
        await payment.save();

        console.log('Payment processed successfully');
        res.redirect('/payment'); // Redirect back to the payment page after successful payment
    } catch (error) {
        console.error('Payment processing failed:', error);
        res.status(500).send('Payment processing failed. Please try again.');
    }
});

module.exports = router;
