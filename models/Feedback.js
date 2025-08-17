// models/Feedback.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
        type: String,  // You can change this to an ObjectId if needed
        required: true
    },
    details: {
        type: String,
        required: true
    },
    timeOfSubmission: {
        type: Date,
        default: Date.now  // Automatically set the current time when feedback is submitted
    },
    isResolved: {
        type: Boolean,
        default: false  // Set unresolved by default
    },
    response: {
        type: String,
        default: ''  // Empty by default, admins can add a response later
    }
});

// Create the model from the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
