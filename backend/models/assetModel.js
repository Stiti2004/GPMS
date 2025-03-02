const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    location: { type: String, required: true },
    acquiredDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Asset', assetSchema);
