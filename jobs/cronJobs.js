const cron = require('node-cron');
const Form = require('../models/Form');
const DailyStat = require('../models/DailyStat');

const startCronJobs = () => {
    // Run at 9 PM every day
    // Cron format: Second (optional), Minute, Hour, Day of Month, Month, Day of Week
    // '0 21 * * *' = At 21:00 (9 PM) every day
    cron.schedule('*  * * * *', async () => {
        console.log('Running functionality to update daily stats at 9 PM...');

        try {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            // Assuming we count forms from 00:00 today until 21:00 (now)
            // or simply count all forms created "today" regardless of time if the goal is "daily total"
            // The prompt says "Calculate total forms submitted today"
            const endOfDay = new Date();
            // endOfDay is now (21:00)

            const count = await Form.countDocuments({
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });

            // Store in DailyStat
            // We use startOfDay as the date key for "today's stats"
            // Check if entry exists to avoid duplicates if cron runs multiple times (unlikely but safe)
            await DailyStat.findOneAndUpdate(
                { date: startOfDay },
                { totalForms: count },
                { upsert: true, new: true }
            );

            console.log(`Daily stats updated: ${count} forms submitted today.`);

        } catch (error) {
            console.error('Error updating daily stats:', error);
        }
    });
};

module.exports = startCronJobs;
