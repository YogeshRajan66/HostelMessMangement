const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Route to display all feedbacks
router.get('/admin-feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timeOfSubmission: -1 });
    res.render('feedback/adminFeedback', { feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).send('Server error');
  }
});

// Route to mark feedback as resolved
router.post('/admin-feedbacks/:id/resolve', async (req, res) => {
  try {
    const feedbackId = req.params.id;
    await Feedback.findByIdAndUpdate(feedbackId, { isResolved: true });
    res.redirect('/admin-feedbacks');
  } catch (error) {
    console.error('Error resolving feedback:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
