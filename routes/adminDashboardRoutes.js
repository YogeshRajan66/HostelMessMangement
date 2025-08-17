const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); 
const Student = require('../models/Student'); // Assuming you have a Student model

// Route to render admin dashboard page
router.get('/admin-dashboard', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all student records from the database
        res.render('dashboard/admin', { students, isEditing: false, editingStudent: null }); // Pass students and set isEditing to false
    } catch (error) {
        console.error('Error fetching student records:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a new student and corresponding user
router.post('/add-student', async (req, res) => {
    const { name, username, email, age, gender, course, year, contactNumber, address, password } = req.body;

    try {
        // Check if username already exists
        const existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            return res.status(400).send('Username already exists.');
        }

        // Create the new student document
        const newStudent = new Student({
            name,
            username,
            email,
            age,
            gender,
            course,
            year,
            contactNumber,
            address
        });
        await newStudent.save(); // Save the student

        // Hash the password for the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user for the new student
        const newUser = new User({
            username,
            password: hashedPassword,  // Store hashed password
            type: 'student'  // User type is 'student'
        });
        await newUser.save(); // Save the user

        res.redirect('/admin-dashboard');  // Redirect to the admin dashboard
    } catch (error) {
        console.error('Error adding new student and user:', error);
        res.status(500).send('Failed to add student and user');
    }
});
// Route to render the edit student form
router.get('/edit-student/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        const editingStudent = await Student.findById(studentId);
        const students = await Student.find();
        if (!editingStudent) {
            return res.status(404).send('Student not found');
        }
        // Render the admin dashboard with student data to edit
        res.render('dashboard/admin', { students, isEditing: true, editingStudent });
    } catch (error) {
        console.error('Error fetching student data for edit:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update a student (POST request)
router.post('/edit-student/:id', async (req, res) => {
    const studentId = req.params.id;
    const { name, username, email, age, gender, course, year, contactNumber, address } = req.body;

    try {
        await Student.findByIdAndUpdate(studentId, {
            name,
            username,
            email,
            age,
            gender,
            course,
            year,
            contactNumber,
            address
        });
        res.redirect('/admin-dashboard');
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Failed to update student');
    }
});

// Route to delete a student
router.post('/delete-student/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        // Find the student to get their username
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        // Delete student from `students` collection
        await Student.findByIdAndDelete(studentId);

        // Delete user account linked to this student
        await User.findOneAndDelete({ username: student.username });

        console.log(`Deleted student: ${student.username} and associated user account`);

        res.redirect('/admin-dashboard');
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Failed to delete student');
    }
});

module.exports = router;

module.exports = router;
