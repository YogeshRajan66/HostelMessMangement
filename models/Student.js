// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Required
    username: { type: String, required: true, unique: true }, // Required
    email: { type: String, required: true, unique: true }, // Required
    age: { type: Number }, // Optional
    gender: { type: String, enum: ['Male', 'Female', 'Other'] }, // Optional
    course: { type: String, required: true }, // Required
    year: { type: Number }, // Optional
    contactNumber: { type: String }, // Optional
    address: { type: String }, // Optional
    // Add other fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
