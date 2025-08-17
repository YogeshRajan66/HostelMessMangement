const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan'); // Assuming the MealPlan model exists

// Route to render the full meal plan edit form
router.get('/edit-meal-plans', async (req, res) => {
    try {
        // Fetch all meal plans from the database
        const mealPlans = await MealPlan.find();

        if (!mealPlans) {
            return res.status(404).send('No meal plans found');
        }

        // Render the meal plan edit page with the meal plans data
        res.render('mealplan/meal_edit', { mealPlans });
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit-meal-plans', async (req, res) => {
    const mealPlans = req.body.mealPlans;

    if (!mealPlans || Object.keys(mealPlans).length === 0) {
        return res.status(400).send('No meal plans to update');
    }

    try {
        // Loop through each meal plan and update it
        for (const mealPlanId in mealPlans) {
            const { breakfast, lunch, dinner } = mealPlans[mealPlanId];
            await MealPlan.findByIdAndUpdate(
                mealPlanId,
                { breakfast, lunch, dinner },
                { new: true }
            );
        }

        // Redirect to the admin dashboard or meal plan list page
        res.redirect('/edit-meal-plans');
    } catch (error) {
        console.error('Error updating meal plans:', error);
        res.status(500).send('Failed to update meal plans');
    }
});

module.exports = router;
