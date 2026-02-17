const mongoose = require('mongoose');

const dailyStatSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    totalForms: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('DailyStat', dailyStatSchema);
