import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export default function CitizenProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/citizen/profile', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        fetchProfile();
    }, []);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
           
            {/* Logout Button at the Top Right */}
            <button onClick={() => navigate('/')} style={logoutButtonStyle}>🚪 Logout</button>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={profileContainer}>
                <h2 style={titleStyle}>Citizen Profile</h2>
               
                <p style={infoStyle}><strong>Name:</strong> {user.fullName}</p>
                <p style={infoStyle}><strong>Gender:</strong> {user.gender}</p>
                <p style={infoStyle}><strong>DOB:</strong> {user.dob}</p>
                <p style={infoStyle}><strong>Household ID:</strong> {user.householdId}</p>
                <p style={infoStyle}><strong>Education:</strong> {user.education}</p>
                <p style={infoStyle}><strong>Occupation:</strong> {user.occupation}</p>

                {/* Back to Citizen Dashboard Button */}
                <Link to="/login/citizen" style={buttonStyle}>⬅ Back to Dashboard</Link>
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

const profileContainer = {
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

const infoStyle = {
    fontSize: '1.1rem',
    color: '#555'
};

const buttonStyle = {
    display: 'block',
    marginTop: '20px',
    padding: '10px',
    borderRadius: '8px',
    background: '#00509d',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
};