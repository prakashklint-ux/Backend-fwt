const cron = require('node-cron');
const Form = require('../models/Form');
const DailyStat = require('../models/DailyStat');
const nodemailer = require('nodemailer');

const startCronJobs = () => {

  cron.schedule('* * * * *', async () => {

    console.log("Running daily report...");

    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();

      const totalForms = await Form.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });

      // Save in DailyStat
      await DailyStat.findOneAndUpdate(
        { date: startOfDay },
        { totalForms },
        { upsert: true }
      );

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Send mail to YOU (Admin)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "nirav.klint@gmail.com",
        subject: "📊 Daily Website Form Report",
        html: `
          <h2>Daily Form Submission Report</h2>
          <p>Total forms received today:</p>
          <h1>${totalForms}</h1>
          <p>Regards,<br/>Your Website System</p>
        `
      });

      console.log("Daily report email sent successfully.");

    } catch (error) {
      console.error("Error sending daily report:", error);
    }

  }, {
    timezone: "Asia/Kolkata"
  });

};

module.exports = startCronJobs;
