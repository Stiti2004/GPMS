const pool = require('../db');

// Generate a report for the government (e.g., agricultural data)
const generateReport = async (reportType) => {
    let query;
    
    if (reportType === 'agriculture') {
        query = `
            SELECT land_id, citizen_id, area_acres, crop_type
            FROM land_records;
        `;
    } else if (reportType === 'health') {
        query = `
            SELECT citizen_id, vaccination_id, vaccine_type, date_administered
            FROM vaccinations;
        `;
    } else {
        throw new Error('Invalid report type');
    }

    try {
        const res = await pool.query(query);
        return res.rows;  // Return the generated report data
    } catch (err) {
        console.error('Error generating report:', err);
        throw new Error('Report generation failed');
    }
};

module.exports = {
    generateReport
};
