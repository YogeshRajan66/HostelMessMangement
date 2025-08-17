const mongoose = require('mongoose');

// Define the schema for a single day's meal plan
const mealPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        unique: true // Each day should be unique (e.g., Monday, Tuesday)
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
