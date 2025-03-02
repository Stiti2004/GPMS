import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PanchayatEmployeeDashboard() {
    return (
        <div style={containerStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={cardStyle}>
                <h2 style={titleStyle}>Panchayat Employee Dashboard</h2>
               
                <div style={menuContainer}>
                    <Link to="/profile/employee" style={buttonStyle}>👤 Profile</Link>
                   
                    {/* Dropdown for Schemes */}
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                        <h3 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '10px' }}>📋 Schemes</h3>
                        <select style={dropdownStyle} onChange={(e) => window.location.href = e.target.value}>
                            <option value="" disabled selected>Select Scheme</option>
                            <option value="/panchayat/schemes/agriculture">Agriculture</option>
                            <option value="/panchayat/schemes/education">Education</option>
                            <option value="/panchayat/schemes/healthcare">Healthcare</option>
                           
                        </select>
                    </div>

                    {/* Other Sections */}
                    <Link to="/panchayat/scheme-enrollments" style={buttonStyle}> Scheme Enrollments</Link>
                    <Link to="/panchayat/vaccinations" style={buttonStyle}>💉 Vaccinations</Link>
                    <Link to="/panchayat/assets" style={buttonStyle}> Assets</Link>
                    <Link to="/panchayat/census-data" style={buttonStyle}>📊 Census Data</Link>
                    <Link to="/panchayat/certificates" style={buttonStyle}>📜 Certificates</Link>
                    <Link to="/panchayat/panchayat-income" style={buttonStyle}>💰 Panchayat Income</Link>
                    <Link to="/panchayat/taxes" style={buttonStyle}>💵 Taxes</Link>
                    <Link to="/panchayat/expenditures" style={buttonStyle}> Expenditures</Link>
                </div>

                {/* Navigation Buttons */}
                <div style={{ marginTop: '20px' }}>
                    {/* <Link to="/" style={homeButtonStyle}>🏠 Home</Link> */}
                    <Link to="/" style={logoutButtonStyle}>🚪 Logout</Link>
                </div>
            </motion.div>
        </div>
    );
}

/* 🔹 Styling */
const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    padding: '20px'
};

const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '500px'
};

const titleStyle = {
    color: '#1e3c72',
    fontWeight: 'bold',
    marginBottom: '15px',
    fontSize: '1.8rem'
};

const menuContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

const buttonStyle = {
    display: 'block',
    padding: '10px',
    borderRadius: '8px',
    background: '#00509d',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
};

const dropdownStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'white',
    cursor: 'pointer'
};

const homeButtonStyle = {
    marginRight: '10px',
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#ffcc29',
    color: '#333',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const logoutButtonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#e63946',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
};