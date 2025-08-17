const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

// Function to handle feedback submission
async function submitFeedback(name, details, userId) {
    if (!details) {
        throw new Error('Details are required');
    }

    // Create a new feedback document
    const newFeedback = new Feedback({
        user: name,
        details: details,
        timeOfSubmission: Date.now(),
        isResolved: false,
        response: ''
    });

    await newFeedback.save();
    console.log(`Feedback saved for user: ${name}`);

    // Create a notification for the feedback submission
    const currentDate = new Date().toLocaleString();
    const newNotification = new Notification({
        userId: userId,
        message: `Feedback submitted successfully on ${currentDate}`,
        isRead: false,
        createdAt: Date.now()
    });

    await newNotification.save();
    console.log('Notification created for feedback submission');

    return currentDate; // Return date to include in the response
}

// Feedback GET route
router.get('/feedback', (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }

    const user = {
        id: req.session.userId,
        name: req.session.username,
        userType: req.session.userType,
        isLoggedIn: req.session.isLoggedIn
    };

    res.render('feedback/feedback', { user });
});

// Feedback POST route using the extracted function
router.post('/feedback2', async (req, res) => {
    const { name, details } = req.body;

    try {
        const currentDate = await submitFeedback(name, details, req.session.userId);
        res.render('feedback/feedback', {
            user: { name },
            successMessage: `Feedback submitted successfully on ${currentDate}`
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.render('feedback/feedback', {
            user: { name },
            successMessage: 'Error submitting feedback! Try again.'
        });
    }
});

module.exports =  router;
module.exports.submitFeedback = submitFeedback;
