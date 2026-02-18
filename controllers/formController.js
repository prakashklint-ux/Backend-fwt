const Form = require('../models/Form');
const DailyStat = require('../models/DailyStat');
const {getStockData } = require('../services/services.js')


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
// @desc    Update form status
// @route   PUT /api/forms/:id/status
// @access  Admin
const updateFormStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Done'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const form = await Form.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json({
      message: "Status updated successfully",
      data: form
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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

// const { getStockData } = require("../services/stockService");

const getStocks = (req, res) => {
  res.json(getStockData());
};




module.exports = {
    submitForm,
    getAllForms,
    getDailyStats,
    updateFormStatus,
    getStockData
};
