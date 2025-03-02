/*
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
*/

const Admin = require('../routes/admin'); 
const PanchayatMember = require('../models/panchayatModel');
const Scheme = require('../routes/scheme');
const Asset = require('../models/assetModel');
const Statistics = require('../models/statisticsModel');

// Admin Homepage
exports.getHomePage = (req, res) => {
    res.json({ message: 'Welcome to the Admin Panel' });
};

// Panchayat Members
exports.getAllPanchayatMembers = async (req, res) => {
    try {
        const members = await PanchayatMember.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPanchayatMember = async (req, res) => {
    try {
        const member = new PanchayatMember(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePanchayatMember = async (req, res) => {
    try {
        const updatedMember = await PanchayatMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePanchayatMember = async (req, res) => {
    try {
        await PanchayatMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Panchayat member deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Welfare Schemes
exports.getAllSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addScheme = async (req, res) => {
    try {
        const scheme = new Scheme(req.body);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateScheme = async (req, res) => {
    try {
        const updatedScheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedScheme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteScheme = async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.json({ message: 'Scheme deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Specific Scheme Types
exports.addEducationScheme = (req, res) => {
    // Implementation for adding education schemes
    res.json({ message: 'Education scheme added' });
};

exports.addAgricultureScheme = (req, res) => {
    res.json({ message: 'Agriculture scheme added' });
};

exports.addHealthcareScheme = (req, res) => {
    res.json({ message: 'Healthcare scheme added' });
};

// Assets Management
exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addAsset = async (req, res) => {
    try {
        const asset = new Asset(req.body);
        await asset.save();
        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAsset = async (req, res) => {
    try {
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAsset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAsset = async (req, res) => {
    try {
        await Asset.findByIdAndDelete(req.params.id);
        res.json({ message: 'Asset deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Statistics
exports.getCensusStatistics = async (req, res) => {
    res.json(await Statistics.getCensus());
};

exports.getIncomeStatistics = async (req, res) => {
    res.json(await Statistics.getIncome());
};

exports.getExpenditureStatistics = async (req, res) => {
    res.json(await Statistics.getExpenditure());
};

exports.getEnvironmentalStatistics = async (req, res) => {
    res.json(await Statistics.getEnvironmental());
};
