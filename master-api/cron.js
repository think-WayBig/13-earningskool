const cron = require("node-cron");
const users_collection = require("./userDatabase/userData");
const moment = require('moment');

// cron.schedule('* * * * *', async () => {
//     console.log('This will run every minute');
//   });

// Run at the start of each day (at midnight)
const resetTodayEarningsJob = cron.schedule('* * * * *', async () => {
    try {
      // Update today's earnings for all users
      const result = await users_collection.updateMany({}, {
        $set: {
          today_earnings: 0
        }
      });
      console.log(`${moment().format('MMM DD YYYY')} - Today's earnings reset for all users.`);
    } catch (error) {
      console.error(`${moment().format('MMM DD YYYY')} - Error resetting today's earnings: ${error}`);
    }
  });

  // run every week on Sunday at midnight
const resetWeeklyEarningsJob = cron.schedule("0 0 * * 0", async () => {
    try {
      // update all users' this week earnings field to 0
      await users_collection.updateMany({}, { $set: { weekly_earnings: 0 } });
      console.log("This week earnings reset.");
    } catch (err) {
      console.error(err);
    }
  });

  // run on the first day of every month at midnight
const resetMonthlyEarningsJob = cron.schedule("0 0 1 * *", async () => {
    try {
      // update all users' this month earnings field to 0
      await users_collection.updateMany({}, { $set: { monthly_earnings: 0 } });
      console.log("This month earnings reset.");
    } catch (err) {
      console.error(err);
    }
  });

  // Run at the start of each year (on January 1st)
const resetYearlyEarningsJob = cron.schedule('0 0 1 1 *', async () => {
    try {
      // Update this year's earnings for all users
      const result = await users_collection.updateMany({}, {
        $set: {
          yearly_earnings: 0
        }
      });
      console.log(`${moment().format('YYYY')} - This year's earnings reset for ${result.nModified} users.`);
    } catch (error) {
      console.error(`${moment().format('YYYY')} - Error resetting this year's earnings: ${error}`);
    }
  });

resetTodayEarningsJob.start();
resetWeeklyEarningsJob.start();
resetMonthlyEarningsJob.start();
resetYearlyEarningsJob.start();

module.exports = {
  resetTodayEarningsJob,
  resetWeeklyEarningsJob,
  resetMonthlyEarningsJob,
  resetYearlyEarningsJob
};