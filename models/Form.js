const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    }, 
    service: {
      type: String,
      enum: ['Loan', 'Insurance', 'Other'],
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Form', formSchema);
