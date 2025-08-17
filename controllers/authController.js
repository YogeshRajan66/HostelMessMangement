// controllers/authController.js
const mockUser = require('../models/mockUser');

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Simulate user authentication
    if (username === mockUser.username && password === mockUser.password) {
        req.session.user = mockUser;
        res.redirect('/dashboard'); // Redirect to a test page or home page
    } else {
        res.status(401).send('Invalid credentials');
    }
};
