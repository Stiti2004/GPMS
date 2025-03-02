import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PanchayatEmployeeProfile() {
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        async function fetchEmployeeData() {
            try {
                const response = await fetch('/api/employee/profile');
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error('Error fetching employee profile:', error);
            }
        }
        fetchEmployeeData();
    }, []);

    if (!employeeData) return <p>Loading Panchayat Employee Profile...</p>;

    return (
        <div style={containerStyle}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={cardStyle}>
                <h2 style={titleStyle}>Panchayat Employee Profile</h2>

                <div style={infoContainer}>
                    <p><strong>First Name:</strong> {employeeData.firstName}</p>
                    <p><strong>Last Name:</strong> {employeeData.lastName}</p>
                    <p><strong>Contact Number:</strong> {employeeData.contact}</p>
                    <p><strong>Gender:</strong> {employeeData.gender}</p>
                    <p><strong>Date of Birth:</strong> {employeeData.dob}</p>
                    <p><strong>Department:</strong> {employeeData.department}</p>
                    <p><strong>Position:</strong> {employeeData.position}</p>
                    <p><strong>Term Start Date:</strong> {employeeData.termStart}</p>
                    <p><strong>Term End Date:</strong> {employeeData.termEnd}</p>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Link to="/login/employee" style={buttonStyle}>⬅ Back to Dashboard</Link>
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

const infoContainer = {
    textAlign: 'left',
    fontSize: '1.1rem',
    color: '#555'
};

const buttonStyle = {
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

