const { submitFeedback } = require('../routes/feedbackRoutes');
const Feedback = require('../models/Feedback');
const Notification = require('../models/Notification');

// Mock the Feedback and Notification models
jest.mock('../models/Feedback');
jest.mock('../models/Notification');

describe('submitFeedback', () => {
    it('should save feedback and create a notification', async () => {
        // Mock implementation for saving feedback and notification
        Feedback.prototype.save = jest.fn().mockResolvedValue();
        Notification.prototype.save = jest.fn().mockResolvedValue();

        const name = 'John Doe';
        const details = 'This is a feedback message.';
        const userId = '12345';

        const currentDate = await submitFeedback(name, details, userId);

        expect(Feedback.prototype.save).toHaveBeenCalled();
        expect(Notification.prototype.save).toHaveBeenCalled();
        expect(currentDate).toBeDefined(); // Check that a date is returned
    });

    it('should throw an error if details are missing', async () => {
        await expect(submitFeedback('John Doe', '', '12345')).rejects.toThrow('Details are required');
    });
});
