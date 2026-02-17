const Form = require('../models/Form');
const DailyStat = require('../models/DailyStat');

// @desc    Submit a new form
// @route   POST /api/forms
// @access  Public
const submitForm = async (req, res) => {
  try {
    const { name, phone, email, city, service, message } = req.body;

    // Basic validation
    if (!name || !phone || !email || !city || !service || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const form = await Form.create({
      name,
      phone,
      email,
      city,
      service,
      message
    });

    // Format date & time
    const submittedDate = form.createdAt.toLocaleDateString();
    const submittedTime = form.createdAt.toLocaleTimeString();

    res.status(201).json({
      message: "Form submitted successfully",
      data: form,
      submittedAt: {
        date: submittedDate,
        time: submittedTime,
        full: form.createdAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Get all forms
// @route   GET /api/forms
// @access  Private (Admin)
const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });

        // Calculate total forms submitted today for quick display
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const todayCount = await Form.countDocuments({
            createdAt: { $gte: startOfDay }
        });

        res.json({
            todayCount,
            forms
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getDailyStats = async (req, res) => {
  try {
    const stats = await DailyStat.find().sort({ date: -1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
    submitForm,
    getAllForms,
    getDailyStats
};
