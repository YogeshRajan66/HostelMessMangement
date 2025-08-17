const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Render the room booking page
router.get('/show-rooms', async (req, res) => {
  res.render('book/index');
});

const floorNumber_glob = 1;

// Fetch rooms for a specific floor
router.get('/floor/:floorNumber', async (req, res) => {
  const floorNumber = req.params.floorNumber;
  const userId = req.session.userId;
  const hasBooked = req.session.hasBooked;

  try {
    const rooms = await Room.find({ floor: floorNumber });

    res.render('book/floor', {
      floor: floorNumber,
      rooms: rooms,
      userId: userId,
      hasBooked: hasBooked
    });
  } catch (err) {
    return res.status(500).send('Error fetching rooms');
  }
});

// Book a room
router.post('/book', async (req, res) => {
  const { roomId, userId, floorNumber } = req.body;

  try {
    const room = await Room.findById(roomId);

    if (room.booked) {
      return res.status(400).send('Room is already booked');
    }

    room.booked = true;
    room.bookedBy.push(userId);
    await room.save();
    req.session.hasBooked = true;

    // Redirect to the same floor page after successful booking
    res.redirect(`/floor/${floorNumber_glob}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error booking room');
  }
});

module.exports = router;
