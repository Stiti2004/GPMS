

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [role, setRole] = useState('');
    const [isCitizenRegistered, setIsCitizenRegistered] = useState(null);
   
    const handleRoleSelection = (selectedRole) => {
        if (selectedRole === 'employee') {
            setRole(selectedRole);
        } else {
            navigate(`/register/${selectedRole}`);
        }
    };

    const handleCitizenRegistrationCheck = (answer) => {
        setIsCitizenRegistered(answer);
        if (answer === 'yes') {
            navigate('/register/employee');
        } else {
            navigate('/register/citizen', { state: { redirectTo: '/register/employee' } });
        }
    };

    React.useEffect(() => {
        if (location.state?.redirectTo) {
            navigate(location.state.redirectTo);
        }
    }, [location, navigate]);

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Home</button>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '400px' }}>
                <h2 style={{ color: '#00509d', fontWeight: 'bold', marginBottom: '15px' }}>Select Your Role</h2>
                <button onClick={() => handleRoleSelection('administrator')} style={buttonStyle}>Administrator</button>
                <button onClick={() => handleRoleSelection('government_monitor')} style={buttonStyle}>Government Monitor</button>
                <button onClick={() => handleRoleSelection('citizen')} style={buttonStyle}>Citizen</button>
                <button onClick={() => handleRoleSelection('employee')} style={buttonStyle}>Panchayat Employee</button>
               
                {role === 'employee' && isCitizenRegistered === null && (
                    <div>
                        <h3 style={{ color: '#00509d', fontWeight: 'bold', marginTop: '15px' }}>Are you already registered as a Citizen?</h3>
                        <button onClick={() => handleCitizenRegistrationCheck('yes')} style={buttonStyle}>Yes</button>
                        <button onClick={() => handleCitizenRegistrationCheck('no')} style={buttonStyle}>No</button>
                    </div>
                )}
                <p style={{ fontSize: '14px', color: '#333' }}>Already have an account? <span style={{ color: '#00509d', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Login</span></p>
            </motion.div>
        </div>
    );
}

const buttonStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    background: '#00509d',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
};