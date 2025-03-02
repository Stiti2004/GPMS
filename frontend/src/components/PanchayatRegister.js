import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RegisterPanchayatMember() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        termStartDate: '',
        termEndDate: '',
        username: '',
        password: '',
        role: ''
    });
    const [error, setError] = useState('');

    const validRoles = ['Sarpanch', 'Secretary', 'Treasurer', 'Ward Member'];
   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (!formData.firstName || !formData.lastName || !formData.contactNumber || !formData.termStartDate || !formData.termEndDate || !formData.username || !formData.password || !formData.role) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('/api/register-panchayat-member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Registration failed.');
                return;
            }

            setError('');
            alert('Panchayat Member registered successfully!');
            navigate('/login');
        } catch (error) {
            setError('Error connecting to server. Please try again later.');
        }
    };

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', fontFamily: 'Poppins, sans-serif', textAlign: 'center', padding: '20px' }}>
            <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px 20px', borderRadius: '8px', background: '#ffcc29', color: '#333', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🏠 Home</button>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', width: '90%', maxWidth: '400px' }}>
                <h2 style={{ color: '#00509d', fontWeight: 'bold', marginBottom: '15px' }}>Register as Panchayat Member</h2>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} style={inputStyle} />
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} style={inputStyle} />
                <input name="contactNumber" type="text" placeholder="Contact Number" onChange={handleChange} style={inputStyle} />
                <label style={{ fontWeight: 'bold', color: '#203a43', display: 'block', textAlign: 'left', marginBottom: '5px' }}>Term Start Date</label>
                <input name="termStartDate" type="date" onChange={handleChange} style={inputStyle} />
                <label style={{ fontWeight: 'bold', color: '#203a43', display: 'block', textAlign: 'left', marginBottom: '5px' }}>Term End Date</label>
                <input name="termEndDate" type="date" onChange={handleChange} style={inputStyle} />
                <input name="username" type="text" placeholder="Username" onChange={handleChange} style={inputStyle} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} />
                <select name="role" onChange={handleChange} style={inputStyle}>
                    <option value="" disabled selected>Select Role in Panchayat</option>
                    {validRoles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <button onClick={handleRegister} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#00509d', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>Submit Registration 📝</button>
                <p style={{ fontSize: '14px', color: '#333' }}>Already registered? <span style={{ color: '#00509d', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/login')}>Login</span></p>
            </motion.div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd'
};