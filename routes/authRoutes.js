const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const router = express.Router();
const Room = require('../models/Room'); 

// User login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.userId = user._id;  
        req.session.userType = user.type;  
        req.session.isLoggedIn = true;  
        req.session.username = username;

        // Check if the user has booked any room
        const roomBooking = await Room.findOne({ bookedBy: user._id });
        req.session.hasBooked = !!roomBooking;  // Set `hasBooked` to true if a booking is found, otherwise false

        console.log(req.session);

        // Redirect based on user type
        if (user.type === 'student') {
            return res.redirect('/dashboard/student');
        } else if (user.type === 'admin') {
            return res.redirect('/dashboard/admin');
        } else {
            return res.status(401).json({ message: 'Invalid user type' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login'); // Render the login page
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});

// Profile route to serve current user's details
router.get('/profile', (req, res) => {
    // Ensure username is stored in the session and user type is student
    if (!req.session.username || req.session.userType !== 'student') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Use username to find the student
    Student.findOne({ username: req.session.username })
        .then(student => {
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            // Render profile page with student data
            res.render('profile/profile', {
                name: student.name,
                username: student.username,
                email: student.email,
                course: student.course,
                year: student.year,
                contactNumber: student.contactNumber,
                address: student.address
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});

module.exports = router;
