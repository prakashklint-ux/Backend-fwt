const cron = require("node-cron");
const Form = require("../models/Form");
const DailyStat = require("../models/DailyStat");
const nodemailer = require("nodemailer");

const startCronJobs = () => {
  cron.schedule(
    "30 17 * * *",
    async () => {
      console.log("Running daily report...");

      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Get today's forms
        const forms = await Form.find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        }).sort({ createdAt: -1 });

        const totalForms = forms.length;

        // Save in DailyStat
        await DailyStat.findOneAndUpdate(
          { date: startOfDay },
          { totalForms },
          { upsert: true },
        );

        // Format form data for email
        let formDetailsHTML = "";

        if (forms.length === 0) {
          formDetailsHTML = "<p>No form submissions today.</p>";
        } else {
          formDetailsHTML = `
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            ${forms
              .map((form) => {
                const dateObj = new Date(form.createdAt);
                const date = dateObj.toLocaleDateString("en-IN");
                const time = dateObj.toLocaleTimeString("en-IN");

                return `
                <tr>
                  <td>${form.name || "-"}</td>
                  <td>${form.phone || "-"}</td>
                  <td>${form.email || "-"}</td>
                  <td>${form.message || "-"}</td>
                  <td>${date}</td>
                  <td>${time}</td>
                </tr>
              `;
              })
              .join("")}
          </table>
        `;
        }

        // Email transporter
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Send email
        // Send email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: ["mann.klint@gmail.com", "nirav.klint@gmail.com"],
          subject: " Daily Website Form Report",
          html: `
    <div style="font-family: Arial, sans-serif;">
      <h2> Daily Form Submission Report</h2>

      <p><strong>Total Forms Today:</strong> ${totalForms}</p>

      <br/>

      ${formDetailsHTML}

      <br/><br/>

      <a href="https://finwisetools.online/admin/login"
         style="
           display:inline-block;
           padding:12px 20px;
           background-color:#007bff;
           color:#ffffff;
           text-decoration:none;
           border-radius:6px;
           font-weight:bold;
         ">
          Open Admin Dashboard
      </a>

      <br/><br/>

      <p>Regards,<br/>Your Website System</p>
    </div>
  `,
        });

        console.log("Daily report email sent successfully.");
      } catch (error) {
        console.error("Error sending daily report:", error);
      }
    },
    {
      timezone: "Asia/Kolkata",
    },
  );
};

module.exports = startCronJobs;
