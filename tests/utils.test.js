// tests/utils.test.js
const { getCurrentDay } = require('../routes/dashboardRoutes');

test('getCurrentDay returns the current day of the week', () => {
  const day = getCurrentDay();
  const expectedDay = new Date().toLocaleString('en-US', { weekday: 'long' });
  expect(day).toBe(expectedDay);
});
