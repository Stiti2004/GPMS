const { generateReport } = require('../models/reportModel');

// Generate a report for government monitors
const generateReports = async (req, res) => {
    try {
        const report = await generateReport(req.body.reportType);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateReports };
