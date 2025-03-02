const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['education', 'agriculture', 'healthcare'], required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
});

module.exports = mongoose.model('Scheme', schemeSchema);
