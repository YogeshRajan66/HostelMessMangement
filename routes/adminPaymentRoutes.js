// routes/adminPaymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Student = require('../models/Student'); // Student model to fetch student info

// Route for the Admin Payments Page
router.get('/admin-payments', async (req, res) => {
    if (!req.session.isLoggedIn || req.session.userType !== 'admin') {
        return res.redirect('/login'); // Ensure only admin can access this page
    }

    try {
        // Fetch all payments and all students from the database
        const payments = await Payment.find();
        const students = await Student.find(); // Fetch all students

        // Render the Admin Payments Page with payment and student data
        res.render('payment/adminPayments', {
            payments: payments,
            students: students
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a new payment for a student
router.post('/admin-payments/add', async (req, res) => {
    if (!req.session.isLoggedIn || req.session.userType !== 'admin') {
        return res.redirect('/login'); // Ensure only admin can add payments
    }

    const { studentUsername, type, amount } = req.body;

    try {
        // Check if the student with the given username exists
        const student = await Student.findOne({ username: studentUsername });

        if (!student) {
            return res.status(400).send('Student not found');
        }

        // Create a new payment entry for the student
        const newPayment = new Payment({
            studentName: student.name, // Use student's name
            studentUsername,
            type,
            amount,
            status: 'pending', // Initial status
            date: Date.now()
        });

        // Save the new payment to the database
        await newPayment.save();

        // Redirect back to the payments overview
        res.redirect('/admin-payments');
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
