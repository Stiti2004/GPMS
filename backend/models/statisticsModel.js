const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    category: { type: String, enum: ['census', 'income', 'expenditure', 'environmental'], required: true },
    year: { type: Number, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true } // Flexible for different types of stats
});

module.exports = mongoose.model('Statistics', statisticsSchema);
