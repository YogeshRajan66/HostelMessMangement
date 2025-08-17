// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['admin', 'student'], // Restrict to these two types
        required: true
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
