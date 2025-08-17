const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');  // Import the MealPlan model

// GET /mealplan route to render the meal plan page
router.get('/mealplan', async (req, res) => {
    try {
        // Fetch all meal plans from the database
        const mealPlans = await MealPlan.find({});
        // Render the meal plan EJS view and pass the mealPlans array
        res.render('mealplan/mealplan', { mealPlans });
    } catch (err) {
        console.error('Error fetching meal plans:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
