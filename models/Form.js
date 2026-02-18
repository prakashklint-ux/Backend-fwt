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
      enum: ['Home Loan', 'Personal Loan', 'Car Loan' ,'Gold Loan' ,'SIP Investment' , 'Car Insurance','Health Insurance','Life Insurance','Education Loan'],
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending'
  }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Form', formSchema);
