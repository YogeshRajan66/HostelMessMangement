const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  floor: {
    type: Number,
    required: true
  },
  roomId: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  booked: {
    type: Boolean,
    default: false
  },
  bookedBy: {
    type: [String],  // Array of usernames
    default: []      // Initialize as an empty array
  }
});

module.exports = mongoose.model('Room', roomSchema);
