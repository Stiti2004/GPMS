import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function CitizenLogin() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
           
            {/* Logout Button at the Top Right */}
            <button onClick={() => navigate('/')} style={logoutButtonStyle}>🚪 Logout</button>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={dashboardContainer}>
                <h2 style={titleStyle}>Citizen Dashboard</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <Link to="/profile/citizen" style={buttonStyle}>👤 Profile</Link>
                    <Link to="/citizen/certificates" style={buttonStyle}>📜 Certificates</Link>
                    <Link to="/citizen/vaccinations" style={buttonStyle}>💉 Vaccinations</Link>
                    <Link to="/citizen/landrecords" style={buttonStyle}>🏠 Land Records</Link>
                    <Link to="/citizen/taxes" style={buttonStyle}>💰 Taxes</Link>
                   
                    {/* Schemes Dropdown */}
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#1e3c72', fontWeight: 'bold', marginBottom: '10px' }}>📋 Schemes</h3>
                        <select style={dropdownStyle} onChange={(e) => window.location.href = e.target.value}>
                            <option value="" disabled selected>Select Scheme</option>
                            <option value="/citizen/schemes/agriculture">Agricultural Scheme</option>
                            <option value="/citizen/schemes/education">Educational Scheme</option>
                            <option value="/citizen/schemes/healthcare">Healthcare Scheme</option>
                        </select>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Styles
const logoutButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#e63946',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const dashboardContainer = {
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

export default CitizenLogin;

