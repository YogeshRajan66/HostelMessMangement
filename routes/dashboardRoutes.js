const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');

// Utility function to get the current day name
function getCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
}

// Student Dashboard Route
router.get('/dashboard/student', async (req, res) => {
    if (!req.session.userId || req.session.userType !== 'student') {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    try {
        // Fetch today's meal plan by day
        const today = getCurrentDay();
        const todayMealPlan = await MealPlan.findOne({ day: today });

        // Fetch payment details for the logged-in student using their username
        const payments = await Payment.find({ studentUsername: req.session.username });

        let messAmount = 0;
        let hostelAmount = 0;
        let hasPendingPayments = false; // Flag to check for pending payments

        payments.forEach(payment => {
            if (payment.type === 'mess' && payment.status === 'pending') {
                messAmount += payment.amount;
                hasPendingPayments = true;
            } else if (payment.type === 'hostel' && payment.status === 'pending') {
                hostelAmount += payment.amount;
                hasPendingPayments = true;
            }
        });

        // Fetch user-specific notifications
        const notifications = await Notification.find({ userId: req.session.userId }).sort({ createdAt: -1 });

        // Render the student dashboard with dynamic content
        res.render('dashboard/student', {
            mealPlan: todayMealPlan,
            messAmount,
            hostelAmount,
            hasPendingPayments,
            notifications
        });

    } catch (err) {
        console.error('Error loading dashboard:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Admin Dashboard Route
router.get('/dashboard/admin', (req, res) => {
    if (!req.session.userId || req.session.userType !== 'admin') {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    res.redirect('/admin-dashboard'); // Redirect to the admin dashboard endpoint
});

//default export
module.exports = router;

// Named export for getCurrentDay
module.exports.getCurrentDay = getCurrentDay;
